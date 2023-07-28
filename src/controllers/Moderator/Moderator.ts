import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import {
  InputHttpMethodsArgument,
  InputHttpMethodsArgumentFile,
  ROUTESLOG,
  ReturnMethod,
  WID,
} from "../../types";
import { Logger } from "../../utils/Logger";
import {
  EnumColorLogger,
  HTTP_RESPONSE,
  METHODS_HTTP,
  ROLES,
} from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";
import {
  IModerator,
  ModeratorDefault,
  keysOfIModerator,
} from "../../interfaces/IModerator";
import ModeratorService from "../../services/ModeratorService";
import {
  ErrorReturn,
  VerifyIDOFUser,
  hasNextPaginate,
} from "../../utils/const";
import { ConvertObj } from "../../utils/ConvertObj";
import md5 from "md5";
import { HttpMethodsFile } from "../../decorators/HttpMethodsFiles";
import SaveImageService from "../../services/SaveImageService/SaveImageService";
import AdminVerificatedService from "../../services/Admin-VerificatedService";

export default class ModeratorController extends Controller<
  IModerator,
  ModeratorService
> {
  public readonly path: string = "/moderator";

  /* GET */
  public readonly pathGetModerators = "/:idAdmin";
  public readonly pathGetModeratorById = "/byid/:id";

  /* POST */
  public readonly pathPostModerator = "/:idAdmin";

  /* PUT */
  public readonly pathPutModerator = "/:id";
  public readonly pathPutModeratorVerify = "/is-verificate/:idAdmin/:id/:isV";
  public readonly pathPutModeratorImageVerificate = "/image-verificate/:id";

  /* DELETE */
  public readonly pathDeleteModerator = "/:id";
  public readonly pathDeleteImage: string = "/image/:id";

  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetModerators,
      plrs: false,
      plur: "Get Moderators need Admin Id",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetModeratorById,
      plrs: false,
      plur: "Get Moderators by Id",
    },

    {
      type: METHODS_HTTP.POST,
      path: this.pathPostModerator,
      plrs: false,
      plur: "Get Moderators need Admin Id for Create",
    },
    {
      type: METHODS_HTTP.PUT,
      path: this.pathPutModerator,
      plrs: false,
      plur: "PUT Moderators need a Id for Update",
    },
    {
      type: METHODS_HTTP.PUT,
      path: this.pathPutModeratorVerify,
      plrs: false,
      plur: "PUT Moderators need Admin Id and Id Moderator for Verificated",
    },
    {
      type: METHODS_HTTP.PUT,
      path: this.pathPutModeratorImageVerificate,
      plrs: false,
      plur: "PUT Moderators need Id Moderator for upload image verificated",
    },
    {
      type: METHODS_HTTP.DELETE,
      path: this.pathDeleteModerator,
      plrs: false,
      plur: "Need a Moderator Id for Delete a Moderate",
    },
  ];

  loggerController: Logger;
  service: ModeratorService;
  constructor() {
    super();
    this.loggerController = new Logger(EnumColorLogger.FgMagenta, "moderator");
    this.service = new ModeratorService();
    this.addInterceptor();
  }

  @HttpMethods()
  async getModerators(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const moderatorService = new ModeratorService();
    const limit = Number(input.query.limit) || 10;
    const page = Number(input.query.page) || 1;
    const { idAdmin } = input.params;
    const { query, pathComplete } = input.body;

    const queryVerify = ConvertObj(keysOfIModerator, query ? query : {});
    const vAdmin = await VerifyIDOFUser(idAdmin, "admin");
    if (vAdmin !== null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: "Not Admin Whit This Id",
      };
    }
    const moderator = await moderatorService.Find(queryVerify, {
      limit,
      page,
    });

    const moderatorWhitPageinate = hasNextPaginate(
      moderator,
      pathComplete,
      "/",
      limit,
      page
    );

    if (moderatorWhitPageinate === null) {
      return {
        response: "Not Models",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: moderatorWhitPageinate,
    };
  }

  @HttpMethods()
  async getModeratorById({
    params,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = params;
    const { type, idUser } = body;
    const moderatorService = new ModeratorService();
    if (
      type !== ROLES.ADMIN &&
      type !== ROLES.MODEL &&
      type !== ROLES.MODERATOR
    ) {
      return {
        response: "T Not Accepte",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }
    const verUser = await VerifyIDOFUser(idUser, type);
    if (verUser !== null) {
      return {
        response: `Not ${type} whit this Id ${idUser}`,
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    const mosd = await moderatorService.FindById(id);
    if (mosd === null)
      return {
        response: "Not Moderator whit this Id",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    let mmm: Partial<WID<IModerator>> = {};

    if (type === "admin") {
      mmm = mosd;
    } else if (type === "model") {
      mmm = {
        _id: mosd._id,
        username: mosd.username,
        name: mosd.name,
      };
    } else if (type === "moderator") {
      if (id === idUser) {
        mmm = {
          _id: mosd._id,
          cc: mosd.cc,
          email: mosd.email,
          lastname: mosd.lastname,
          name: mosd.name,
          password: mosd.password,
          username: mosd.username,
          verificatePhoto: mosd.verificatePhoto,
          isVerificate: mosd.isVerificate,
        };
      } else {
        return {
          status: HTTP_RESPONSE.ACCEPTED,
          response: "your not moderator",
        };
      }
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: mmm,
    };
  }

  @HttpMethods()
  async postModerator({
    body,
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idAdmin } = params;
    const fA = ["permissions", "admin"];
    const kesy = keysOfIModerator.filter((e) => !fA.includes(e));
    const modelVeri = ConvertObj([...kesy], body) as Partial<IModerator>;

    const us = await VerifyIDOFUser(idAdmin, "admin");

    if (us !== null) {
      return {
        response: "not Admin whit this id",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    if (Object.keys(modelVeri).length === 0) {
      return {
        response: "The Content en body not is Aceptable",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }
    const service = new ModeratorService();

    const password = modelVeri.password ? modelVeri.password : "";

    const modelComplete: IModerator = {
      ...ModeratorDefault,
      ...modelVeri,
      password: md5(password),
      admin: idAdmin,
    };

    const mcs = (await service.Create(modelComplete)) as WID<IModerator>;
    if (mcs === null) {
      return ErrorReturn("Moderator");
    }
    const moderatorcreate = mcs as WID<IModerator>;
    const moderatorFilter: Partial<WID<IModerator>> = {
      _id: moderatorcreate._id,
      name: moderatorcreate.name,
      lastname: moderatorcreate.lastname,
      username: moderatorcreate.username,
      email: moderatorcreate.email,
      cc: moderatorcreate.cc,
      isVerificate: moderatorcreate.isVerificate,
      verificatePhoto: moderatorcreate.verificatePhoto,
    };
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: moderatorFilter,
    };
  }

  @HttpMethods()
  async putModerator(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { body, params } = input;
    const { id } = params;
    const fA = ["email", "username", "name"];
    const kesy = keysOfIModerator.filter((e) => !fA.includes(e));

    const modelVeri = ConvertObj([...kesy], body) as Partial<IModerator>;

    if (Object.keys(modelVeri).length === 0) {
      return {
        response: "The Content en body.update not is Aceptable",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    const service = new ModeratorService();

    const modelById = await service.FindById(id);

    if (modelById === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Moderator Whit This Id>>",
      };
    }
    const modelUpdate = (await service.Update(
      { _id: id },
      modelVeri
    )) as WID<IModerator>;

    if (modelUpdate === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Model Whit This Id",
      };
    }

    const moderatorr: Partial<WID<IModerator>> = {
      _id: modelUpdate._id,
      cc: modelUpdate.cc,
      email: modelUpdate.email,
      lastname: modelUpdate.lastname,
      name: modelUpdate.name,
      password: modelUpdate.password,
      username: modelUpdate.username,
      verificatePhoto: modelUpdate.verificatePhoto,
      isVerificate: modelUpdate.isVerificate,
    };

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: moderatorr,
    };
  }

  @HttpMethods()
  async putModeratorVerify({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    //"/is-verificate/:idAdmin/:id/:isV";
    const { idAdmin, id, isV } = params;
    const iss = isV as string;

    const admin = await VerifyIDOFUser(idAdmin, "admin");
    if (admin !== null) {
      return {
        response: `Not Admin whit this Id ${idAdmin}`,
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }
    if (iss !== "true" && iss !== "false") {
      return {
        response: `Not Valid Boolean true o false`,
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
      };
    }

    const moderatorservice = new ModeratorService();
    const model = await moderatorservice.FindById(id);
    if (model === null) {
      return {
        response: `Not Model whit this Id ${id}`,
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    moderatorservice.Update(
      { _id: id },
      {
        isVerificate: Boolean(isV),
      }
    );

    const avs = new AdminVerificatedService();
    const ing = await avs.Create({
      idAdmin,
      types: "model",
      idUser: id,
    });

    if (ing === null) {
      // Notificar
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Moderator Verificate",
    };
  }

  @HttpMethodsFile()
  async putModeratorImageVerificate({
    file,
    params,
  }: InputHttpMethodsArgumentFile): Promise<ReturnMethod> {
    const { id } = params;
    const moderatorService: ModeratorService = new ModeratorService();
    const moderator = await moderatorService.FindById(id);
    if (moderator === null)
      return {
        response: "Not Model Whit this Id",
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
      };
    moderatorService.SavePhotoVerificated(file, moderator._id, (file) => {
      console.log(file);
    });

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Save Photo",
    };
  }

  @HttpMethods()
  async deleteModerator({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = params;
    const moderatorService = new ModeratorService();

    const moderator = await moderatorService.FindById(id);
    if (moderator === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Moderartor Whit this Id",
      };
    }

    if (moderator.verificatePhoto) {
      if (moderator.verificatePhoto.public_id !== "") {
        return {
          response: "Delete Images First VerificatePhoto",
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
        };
      }
    }

    const deleting = await moderatorService.Delete(id);
    const mdD: Partial<IModerator> = {
      username: deleting.username,
      name: deleting.name,
      email: deleting.email,
    };

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: mdD,
    };
  }

  @HttpMethods()
  async deleteImages({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = params;

    let update: object = {
      verificatePhoto: {
        public_id: "",
        secure_url: "",
        url: "",
        cl_type: "",
        resource_type: "",
      },
    };

    const moderatorservice = new ModeratorService();
    const moderator = await moderatorservice.FindById(id);
    if (moderator === null)
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: `Not Model Whit Id ${id}`,
      };

    if (moderator.verificatePhoto === undefined) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: `Not VerifyImage en Moderator`,
      };
    }
    if (moderator.verificatePhoto.public_id === "") {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: `Not VerifyImage en Model`,
      };
    }
    const saveImageService = new SaveImageService();
    saveImageService.deleteImage({
      ids: [
        {
          ids: [moderator.verificatePhoto.public_id],
          resource_type: moderator.verificatePhoto.resource_type,
          type: moderator.verificatePhoto.cl_type,
        },
      ],
    });

    await moderatorservice.Update({ _id: id }, update);

    return {
      status: HTTP_RESPONSE.NO_ACCEPTABLE,
      response: `Images of type VerifyImage Delete`,
    };
  }

  Interceptor(
    _req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    _res: Response<any, Record<string, any>>,
    next: Function,
    interceptorLogger: ILoggerChild,
    path: string
  ): void {
    interceptorLogger.LogChild(
      "Viewer-controller",
      `Interceptor of ${path.toUpperCase()}`
    );
    next();
  }
}

export const moderatorController: ModeratorController =
  new ModeratorController();
