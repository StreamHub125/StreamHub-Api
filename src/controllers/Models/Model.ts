import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import {
  EnumColorLogger,
  HTTP_RESPONSE,
  METHODS_HTTP,
  ROLES,
} from "../../types.enum";
import { Logger } from "../../utils/Logger";
import HttpMethods from "../../decorators/HttpMethods";
import {
  InputHttpMethodsArgument,
  InputHttpMethodsArgumentFile,
  InputHttpMethodsArgumentFiles,
  ROUTESLOG,
  ReturnMethod,
  WID,
} from "../../types";
import ModelService from "../../services/ModelService";
import { IModel, ModelDefault, keysOfIModel } from "../../interfaces/IModel";
import {
  ErrorReturn,
  VerifyIDOFUser,
  hasNextPaginate,
} from "../../utils/const";
import { ConvertObj } from "../../utils/ConvertObj";
import { UserWAvatarDefault, keysOfIUser } from "../../interfaces/IUser";
import md5 from "md5";
import {
  HttpMethodsFile,
  HttpMethodsFiles,
} from "../../decorators/HttpMethodsFiles";
import { randomUUID } from "crypto";
import ImagesService from "../../services/ImagesService";
import AdminService from "../../services/AdminService";
import SaveImageService from "../../services/SaveImageService/SaveImageService";
import ModeratorService from "../../services/ModeratorService";
import AdminVerificatedService from "../../services/Admin-VerificatedService";

export default class ModelController extends Controller<IModel, ModelService> {
  public readonly path = "/model";

  //Routes
  /* GETS */
  public readonly pathGetModels: string = "/";
  public readonly pathGetModelById: string = "/:id";

  /* POSTS */
  public readonly pathPostModel: string = "/";

  /* PUTS */
  public readonly pathPutModel: string = "/:id";
  public readonly pathPutModelImageSale: string = "/image-sale/:id";
  public readonly pathPutModelImageAvatar: string = "/avatar/:id";
  public readonly pathPutModelImageVerificate: string = "/image-verificate/:id";
  public readonly pathPutModelIsVerificate: string =
    "/is-verificate/:idAdmin/:id/:isV";

  /* DELETES */
  public readonly pathDeleteModel: string = "/:id";
  public readonly pathDeleteImage: string = "/image/:id/:type";
  //Finish Routes

  service: ModelService;
  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      plur: "By Limit and page {url}?limit=5&page=1", // Example "By ID"
      path: this.pathGetModels,
      plrs: true,
    },
    {
      type: METHODS_HTTP.GET,
      plur: "By Id", // Example "By ID"
      path: this.pathGetModelById,
      plrs: false,
    },
    {
      type: METHODS_HTTP.POST,
      plur: "Receives Body type IModel", // Example "By ID"
      path: this.pathPostModel,
      plrs: false,
    },
    {
      type: METHODS_HTTP.PUT,
      plur: "By id Receives Body type Omit<IModel, 'isVerificate'>", // Example "By ID"
      path: this.pathPutModel,
      plrs: false,
    },
    {
      type: METHODS_HTTP.PUT,
      plur: "By id Receives Body type Avatar Image", // Example "By ID"
      path: this.pathPutModelImageAvatar,
      plrs: false,
    },
    {
      type: METHODS_HTTP.PUT,
      plur: "By id Receives Body type {photo: file<Image>, price: number}", // Example "By ID"
      path: this.pathPutModelImageSale,
      plrs: false,
    },
    {
      type: METHODS_HTTP.PUT,
      plur: "By id Receives Body type Verificate Image", // Example "By ID"
      path: this.pathPutModelImageVerificate,
      plrs: false,
    },
    {
      type: METHODS_HTTP.PUT,
      plur: "By id and idAdmin and boolean 0 = true 1 = false", // Example "By ID"
      path: this.pathPutModelIsVerificate,
      plrs: false,
    },
    {
      type: METHODS_HTTP.DELETE,
      plur: "By id", // Example "By ID"
      path: this.pathDeleteModel,
      plrs: false,
    },
  ];

  loggerController: Logger;

  constructor() {
    super();
    this.service = new ModelService();
    this.loggerController = new Logger(
      EnumColorLogger.FgCyan,
      this.pathRemove()
    );
    this.addInterceptor();
  }

  // Se puede enviar con el body sin nada
  @HttpMethods()
  async getModels(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const modelService = new ModelService();
    const limit = Number(input.query.limit) || 10;
    const page = Number(input.query.page) || 1;
    const { pathComplete, idAdmin, query } = input.body;

    const queryVerify = ConvertObj(keysOfIModel, query ? query : {});
    const vAdmin = await VerifyIDOFUser(idAdmin, "admin");
    const models = await modelService.Find(queryVerify, {
      limit,
      page,
    });

    const modelsWhitPageinate = hasNextPaginate(
      models,
      pathComplete,
      "/",
      limit,
      page
    );

    if (modelsWhitPageinate === null) {
      return {
        response: "Not Models",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    if (vAdmin !== null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: modelsWhitPageinate,
      };
    }

    modelsWhitPageinate.docs = modelsWhitPageinate.docs.map((model) => {
      return {
        _id: model._id,
        username: model.username,
        tag: model.tag,
        gender: model.gender,
        avatar: model.avatar ? model.avatar : UserWAvatarDefault.avatar,
      };
    });

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: modelsWhitPageinate,
    };
  }

  @HttpMethods()
  async getModelById(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = input.params;
    const { client, idUser } = input.body;
    const service = new ModelService();
    if (
      client !== ROLES.MODEL &&
      client !== ROLES.MODERATOR &&
      client !== ROLES.VIEWER &&
      client !== ROLES.ADMIN
    ) {
      return {
        response: "Type not is acceptable",
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
      };
    }

    if (idUser === undefined || idUser === null) {
      return {
        response: "id of User Required",
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
      };
    }

    const model = await service.FindById(id);
    if (model === null) {
      return {
        response: `Not Model whit this id: ${id}`,
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }
    let modelM: Partial<WID<IModel>> = {
      _id: model._id,
      email: model.email,
      username: model.username,
      gender: model.gender,
      tag: model.tag,
      avatar: model.avatar,
    };

    if (client === ROLES.ADMIN) {
      const adminService = new AdminService();
      const user = await adminService.FindById(idUser);
      if (user === null) {
        return {
          response: "Not Admin Whit this Id",
          status: HTTP_RESPONSE.ACCEPTED,
        };
      }
      modelM = model;
    } else if (client === ROLES.VIEWER) {
      if (model.isVerificate === false) {
        return {
          status: HTTP_RESPONSE.ACCEPTED,
          response: "Not model whit This Id",
        };
      } else {
        modelM = {
          _id: model._id,
          username: model.username,
          gender: model.gender,
          tag: model.tag,
          avatar: model.avatar,
        };
      }
    } else if (client === ROLES.MODERATOR) {
      const moderatorService = new ModeratorService();
      const mod = await moderatorService.FindById(idUser);
      if (mod === null) {
        return {
          response: "Not Moderator Whit this Id",
          status: HTTP_RESPONSE.ACCEPTED,
        };
      }
      modelM = {
        _id: model._id,
        username: model.username,
        gender: model.gender,
        tag: model.tag,
        avatar: model.avatar,
      };
    } else if (client === ROLES.MODEL) {
      if (id !== idUser) {
        modelM = {
          _id: model._id,
          username: model.username,
          isVerificate: model.isVerificate,
          gender: model.gender,
          tag: model.tag,
        };
      }
      modelM = model;
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: modelM,
    };
  }

  @HttpMethods()
  async postModel(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { body } = input;

    const modelVeri = ConvertObj(
      [...keysOfIUser, "gender"],
      body
    ) as Partial<IModel>;

    if (Object.keys(modelVeri).length === 0) {
      return {
        response: "The Content en body not is Aceptable",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }
    const service = new ModelService();

    const password = modelVeri.password ? modelVeri.password : "";

    const modelComplete: IModel = {
      ...ModelDefault,
      ...modelVeri,
      secret_key: randomUUID(),
      password: md5(password),
    };

    // return {
    //   status: HTTP_RESPONSE.ACCEPTED,
    //   response: modelComplete,
    // };

    let modelcreate = await service.Create(modelComplete);
    if (modelcreate === null) {
      return ErrorReturn("Model");
    }

    const cmodelcreate = { ...modelcreate } as WID<IModel>;
    const modelFilter: Partial<WID<IModel>> = {
      _id: cmodelcreate._id,
      name: cmodelcreate.name,
      lastname: cmodelcreate.lastname,
      username: cmodelcreate.username,
      email: cmodelcreate.email,
      cc: cmodelcreate.cc,
      gender: cmodelcreate.gender,
      tag: cmodelcreate.tag,
    };
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: modelFilter,
    };
  }

  @HttpMethods()
  async putModel(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { body, params } = input;
    const { id } = params;

    const modelVeri = ConvertObj(
      [...keysOfIUser, "gender", "tag"],
      body
    ) as Partial<IModel>;

    if (Object.keys(modelVeri).length === 0) {
      return {
        response: "The Content en body.update not is Aceptable",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    const service = new ModelService();

    const modelById = await service.FindById(id);

    if (modelById === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Model Whit This Id>>",
      };
    }

    const modelUpdate = await service.Update({ _id: id }, modelVeri);

    if (modelUpdate === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Model Whit This Id",
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: modelUpdate,
    };
  }

  @HttpMethodsFiles()
  async putModelImageSale({
    files,
    params,
  }: InputHttpMethodsArgumentFiles): Promise<ReturnMethod> {
    const { id } = params;
    const modelService: ModelService = new ModelService();
    const model = await modelService.FindById(id);
    if (model === null)
      return {
        response: "Not Model Whit this Id",
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
      };
    files.forEach((file) => {
      modelService.SavePhotoSale(file, model._id, (file) => {
        console.log(file);
      });
    });

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Save Photos",
    };
  }

  @HttpMethodsFile()
  async putModelImageAvatar({
    params,
    file,
  }: InputHttpMethodsArgumentFile): Promise<ReturnMethod> {
    const { id } = params;
    const modelService: ModelService = new ModelService();
    const model = await modelService.FindById(id);
    if (model === null)
      return {
        response: "Not Model Whit this Id",
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
      };
    modelService.SavePhotoAvatar(file, model._id, (file) => {
      console.log(file);
    });

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Save Photos",
    };
  }

  @HttpMethodsFile()
  async putModelImageVerificate({
    params,
    file,
  }: InputHttpMethodsArgumentFile): Promise<ReturnMethod> {
    const { id } = params;
    const modelService: ModelService = new ModelService();
    const model = await modelService.FindById(id);
    if (model === null)
      return {
        response: "Not Model Whit this Id",
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
      };
    modelService.SavePhotoVerificated(file, model._id, (file) => {
      console.log(file);
    });

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Save Photo",
    };
  }

  @HttpMethods()
  async putModelIsVerificate({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    //"/is-verificate/:idAdmin/:id/:isV";
    const { idAdmin, id, isV } = params;
    const iss = isV as string;

    if (iss !== "true" && iss !== "false") {
      return {
        response: `Not Valid Boolean true o false`,
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
      };
    }

    const adminservice = new AdminService();
    const admin = await adminservice.FindById(idAdmin);
    if (admin === null) {
      return {
        response: `Not Admin whit this Id ${idAdmin}`,
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }
    const modelservice = new ModelService();
    const model = await modelservice.FindById(id);
    if (model === null) {
      return {
        response: `Not Model whit this Id ${id}`,
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    modelservice.Update(
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
      response: "Model Verificate",
    };
  }

  @HttpMethods()
  async deleteModel({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = params;
    const modelService = new ModelService();

    const model = await modelService.FindById(id);
    if (model === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Model Whit this Id",
      };
    }

    if (model.avatar) {
      if (model.avatar.public_id !== "") {
        return {
          response: "Delete Images First Avatar",
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
        };
      }
    }

    if (model.verificatePhoto) {
      if (model.verificatePhoto.public_id !== "") {
        return {
          response: "Delete Images First VerificatePhoto",
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
        };
      }
    }

    const imageservice = new ImagesService();
    const images = await imageservice.Find(
      {
        idModel: id,
      },
      {
        limit: 10,
        page: 1,
      }
    );

    if (images !== null) {
      if (images.totalDocs > 0) {
        return {
          response: "Delete Images First Saleimages",
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
        };
      }
    }

    const deleting = await modelService.Delete(id);

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: deleting,
    };
  }

  @HttpMethods()
  async deleteImages({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id, type } = params;

    if (type !== "avatar" && type !== "verifyimage") {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: "Not Acceptable the Type",
      };
    }

    let update: object = {
      avatar: {
        public_id: "",
        secure_url: "",
        url: "",
        cl_type: "",
        resource_type: "",
      },
    };

    const modelService = new ModelService();
    const model = await modelService.FindById(id);
    if (model === null)
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: `Not Model Whit Id ${id}`,
      };
    if (type === "avatar") {
      if (model.avatar === undefined) {
        return {
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
          response: `Not Avatar en Model`,
        };
      }
      if (model.avatar.public_id === "") {
        return {
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
          response: `Not Avatar en Model`,
        };
      }
      const saveImageService = new SaveImageService();
      saveImageService.deleteImage({
        ids: [
          {
            ids: [model.avatar.public_id],
            resource_type: model.avatar.resource_type,
            type: model.avatar.cl_type,
          },
        ],
      });
      update = {
        avatar: {
          public_id: "",
          secure_url: "",
          url: "",
          cl_type: "",
          resource_type: "",
        },
      };
    }

    if (type === "verifyimage") {
      if (model.verificatePhoto === undefined) {
        return {
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
          response: `Not VerifyImage en Model`,
        };
      }
      if (model.verificatePhoto.public_id === "") {
        return {
          status: HTTP_RESPONSE.NO_ACCEPTABLE,
          response: `Not VerifyImage en Model`,
        };
      }
      const saveImageService = new SaveImageService();
      saveImageService.deleteImage({
        ids: [
          {
            ids: [model.verificatePhoto.public_id],
            resource_type: model.verificatePhoto.resource_type,
            type: model.verificatePhoto.cl_type,
          },
        ],
      });
      update = {
        verificatePhoto: {
          public_id: "",
          secure_url: "",
          url: "",
          cl_type: "",
          resource_type: "",
        },
      };
    }

    await modelService.Update({ _id: id }, update);

    return {
      status: HTTP_RESPONSE.NO_ACCEPTABLE,
      response: `Images of type ${type} Delete`,
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
      "Model-Controller",
      `Execute Interceptor of ${path.toUpperCase()}`
    );
    next();
  }
}

export const modelController: ModelController = new ModelController();
