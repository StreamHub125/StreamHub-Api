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
  ROUTESLOG,
  ReturnMethod,
  WID,
} from "../../types";
import {
  CodeGenerator,
  ErrorReturn,
  VerifyIDOFUser,
  hasNextPaginate,
} from "../../utils/const";
import { ConvertObj } from "../../utils/ConvertObj";
import md5 from "md5";
import ModeratorService from "../../services/ModeratorService";
import {
  CountMasterDefault,
  ICountMaster,
  keysOfICountMaster,
} from "../../interfaces/ICountMaster";
import CountMasterService from "../../services/CountMasterService";
import {
  IModerator,
  ModeratorDefault,
  keysOfIModerator,
} from "../../interfaces/IModerator";
import CodeService from "../../services/CodeService";
import { CODETYPE, CODETYPEACTION, ICode } from "../../interfaces/ICode";

export default class CountMasterController extends Controller<
  ICountMaster,
  CountMasterService
> {
  public readonly path = "/count-master";

  //Routes
  /**
   * All CountMasters
   * Get all CountsMaster need Id Admin
   * Get CountMaster need id master
   *
   * Post CountMaster need Id
   *
   * Put CountMaster need Id
   *
   * Delete CountMaster need Id
   * Delete Confirm CountMaster need code
   */
  /* GETS */
  public readonly pathGetCountMasters: string = "/:idAdmin";
  public readonly pathGetCountMasterById: string = "/:id";

  /* POSTS */
  public readonly pathPostCountMaster: string = "/";

  /* PUTS */
  public readonly pathPutCountMaster: string = "/:id";

  /* DELETES */
  public readonly pathDeleteCountMaster: string = "/:id";
  public readonly pathDeleteCountMasterConfirmation: string = "/:code";
  //Finish Routes

  service: CountMasterService;
  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      plur: "By Limit and page {url}?limit=5&page=1", // Example "By ID"
      path: this.pathGetCountMasters,
      plrs: true,
    },
    {
      type: METHODS_HTTP.GET,
      plur: "By Id", // Example "By ID"
      path: this.pathGetCountMasterById,
      plrs: false,
    },
    {
      type: METHODS_HTTP.POST,
      plur: "Receives Body type IModel", // Example "By ID"
      path: this.pathPostCountMaster,
      plrs: false,
    },
    {
      type: METHODS_HTTP.PUT,
      plur: "By id Receives Body type Omit<IModel, 'isVerificate'>", // Example "By ID"
      path: this.pathPutCountMaster,
      plrs: false,
    },
    {
      type: METHODS_HTTP.DELETE,
      plur: "By id", // Example "By ID"
      path: this.pathDeleteCountMaster,
      plrs: false,
    },
  ];

  loggerController: Logger;

  constructor() {
    super();
    this.service = new CountMasterService();
    this.loggerController = new Logger(
      EnumColorLogger.FgCyan,
      this.pathRemove()
    );
    this.addInterceptor();
  }

  // Se puede enviar con el body sin nada
  @HttpMethods()
  async getCountMasters(
    input: InputHttpMethodsArgument
  ): Promise<ReturnMethod> {
    const countService = new CountMasterService();
    const limit = Number(input.query.limit) || 10;
    const page = Number(input.query.page) || 1;
    const { pathComplete, query } = input.body;
    const { idAdmin } = input.params;

    const queryVerify = ConvertObj(keysOfICountMaster, query ? query : {});
    const vAdmin = await VerifyIDOFUser(idAdmin, "admin");
    const countMasters = await countService.Find(queryVerify, {
      limit,
      page,
    });

    const countMasterWhitPageinate = hasNextPaginate(
      countMasters,
      pathComplete,
      `/${idAdmin}/`,
      limit,
      page
    );

    if (countMasterWhitPageinate === null) {
      return {
        response: "Not CountsMasters",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    if (vAdmin === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: "Not Admin whit this Id",
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: countMasterWhitPageinate,
    };
  }

  @HttpMethods()
  async getCountMasterById(
    input: InputHttpMethodsArgument
  ): Promise<ReturnMethod> {
    const { id } = input.params;
    const { client, idUser } = input.body;
    const service = new CountMasterService();
    if (client !== ROLES.MODEL) {
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

    const countMaster = (await service.FindById(id)) as WID<ICountMaster>;
    if (countMaster === null) {
      return {
        response: `Not Model whit this id: ${id}`,
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }
    let countMasterM: Partial<WID<ICountMaster>> = countMaster;

    if (client === ROLES.MODEL) {
      if (id !== idUser) {
        countMasterM = {
          _id: countMaster._id,
          email: countMaster.email,
          companyName: countMaster.companyName,
        };
      }
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: countMasterM,
    };
  }

  @HttpMethods()
  async postCountMaster(
    input: InputHttpMethodsArgument
  ): Promise<ReturnMethod> {
    const { body } = input;

    const countMasterVeri = ConvertObj(
      [...keysOfICountMaster],
      body
    ) as Partial<ICountMaster>;

    const moderatorVeri = ConvertObj(
      [...keysOfIModerator],
      body
    ) as Partial<IModerator>;

    if (Object.keys(countMasterVeri).length === 0) {
      return {
        response: "The Content en body not is Aceptable",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    if (Object.keys(moderatorVeri).length === 0) {
      return {
        response: "The Content en body not is Aceptable",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }
    const service = new CountMasterService();
    const serviceModerator = new ModeratorService();

    const password = countMasterVeri.password
      ? md5(countMasterVeri.password)
      : "";

    const moderatorComplete: IModerator = {
      ...ModeratorDefault,
      ...moderatorVeri,
      password,
    };

    let moderatorcreate = (await serviceModerator.Create(
      moderatorComplete
    )) as WID<IModerator>;
    if (moderatorcreate === null) {
      return ErrorReturn("Moderator");
    }
    const countMasterComplete: ICountMaster = {
      ...CountMasterDefault,
      ...countMasterVeri,
      password,
      idModeratorOwner: moderatorcreate._id,
    };

    let countmastercreate = await service.Create(countMasterComplete);
    if (countmastercreate === null) {
      return ErrorReturn("CountMaster");
    }

    const cmodelcreate = { ...countmastercreate } as WID<ICountMaster>;
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: cmodelcreate,
    };
  }

  @HttpMethods()
  async putCountMaster(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { body, params } = input;
    const { id } = params;

    const countMasterVeri = ConvertObj(
      [
        ...keysOfICountMaster.filter(
          (e) => !["idModeratorOwner", "idCrendentialPayment"].includes(e)
        ),
      ],
      body
    ) as Partial<ICountMaster>;

    if (Object.keys(countMasterVeri).length === 0) {
      return {
        response: "The Content en body.update not is Aceptable",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    const service = new CountMasterService();

    const countmaster = await service.FindById(id);

    if (countmaster === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Count Master Whit This Id>>",
      };
    }

    const countmasterUpdate = await service.Update(
      { _id: id },
      countMasterVeri
    );

    if (countmasterUpdate === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Count Master Whit This Id",
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: countmasterUpdate,
    };
  }

  @HttpMethods()
  async deleteCountMaster({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = params;
    const countMasterService = new CountMasterService();

    const countmaster = (await countMasterService.FindById(
      id
    )) as WID<ICountMaster> | null;
    if (countmaster === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Count Master Whit this Id",
      };
    }

    const codeService = new CodeService();
    const cC = CodeGenerator(countmaster._id);

    const code = codeService.Create({
      action: CODETYPEACTION.DELTING,
      code: cC,
      hInit: "count-master",
      types: CODETYPE.COUNTMASTER,
      doc: {
        id,
      },
    });

    console.log({ code });

    // Send Email

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Email Send For Confrim Deleting",
    };
  }

  @HttpMethods()
  async deleteCountMasterConfirmation({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { code } = params;
    const countMasterService = new CountMasterService();
    const codeService = new CodeService();

    const codes = (await codeService.FindByCode(code)) as WID<ICode> | null;
    if (codes === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Code",
      };
    }

    if (codes.action !== CODETYPEACTION.DELTING) {
      return ErrorReturn("CountMaster", "This Code not is for Deleting");
    }

    const deleting = await countMasterService.Delete(codes.doc.id);

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: deleting,
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

export const countMasterController: CountMasterController =
  new CountMasterController();
