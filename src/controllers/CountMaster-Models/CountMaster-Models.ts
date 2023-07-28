import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";
import {
  ErrorReturn,
  VerifyIDOFUser,
  hasNextPaginate,
} from "../../utils/const";
import CountMasterModelsService from "../../services/CountMaster-Models";
import { ICountMasterModels } from "../../interfaces/ICountMaster-Models";
import ModelService from "../../services/ModelService";

export default class CountMasterModelsController extends Controller<
  ICountMasterModels,
  CountMasterModelsService
> {
  public readonly path: string = "/countmaster-models";

  /* GET */
  public readonly pathGetMDSModel = "/model/:idModel";
  public readonly pathGetMDSCountmaster = "/countmaster/:idCM";

  /* POST */
  public readonly pathPostSubscribe = "/subscribe/:idModel/:idCM";

  /* DELETE */
  public readonly pathDeleteUnsubscribe = "/unsubscribe/:idModel/:idCM";

  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetMDSModel,
      plrs: false,
      plur: "Get Moderators - Models by Model need Model Id",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetMDSCountmaster,
      plrs: false,
      plur: "Get Moderators - Models by Moderator need Moderartor Id",
    },
    {
      type: METHODS_HTTP.POST,
      path: this.pathPostSubscribe,
      plrs: false,
      plur: "Subscribe need Id Admin, Id Model and Id Moderator",
    },
    {
      type: METHODS_HTTP.DELETE,
      path: this.pathDeleteUnsubscribe,
      plrs: false,
      plur: "Unsubscribe need Id Admin, Id Model and Id Moderator",
    },
  ];
  loggerController: Logger;
  service: CountMasterModelsService;
  constructor() {
    super();
    this.loggerController = new Logger(
      EnumColorLogger.FgMagenta,
      "countmaster-models"
    );
    this.service = new CountMasterModelsService();
    this.addInterceptor();
  }

  @HttpMethods()
  async getMDSModel({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idModel } = params;
    const service = new CountMasterModelsService();

    const user = await VerifyIDOFUser(idModel, "model");

    if (user !== null) {
      return user;
    }

    const models = await service.Find({ idModel }, { limit: 10, page: 1 });

    if (models === null) {
      return {
        response: "",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    if (models.docs) {
      if (models.docs[0]) {
        return {
          status: HTTP_RESPONSE.ACCEPTED,
          response: models.docs[0],
        };
      } else {
        return {
          status: HTTP_RESPONSE.ACCEPTED,
          response: "The model no exist in count master",
        };
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: "The model no exist in count master",
      };
    }
  }

  @HttpMethods()
  async getMDSCountmaster({
    body,
    params,
    query,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idCM } = params;
    const { pathComplete } = body;
    const service = new CountMasterModelsService();
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;

    const user = await VerifyIDOFUser(idCM, "count-master");

    if (user !== null) {
      return user;
    }

    const countmasterModle = await service.Find({ idCM }, { limit, page });

    if (countmasterModle === null) {
      return {
        response: "Not Exist",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }
    const mdsModeratorWhitPageinate = hasNextPaginate(
      countmasterModle,
      pathComplete,
      `/countmaster-models/countmaster/${idCM}`,
      limit,
      page
    );

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: mdsModeratorWhitPageinate,
    };
  }

  @HttpMethods()
  async postSubscribe({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    //:idAdmin/:idModel/:idModerator"
    const { idModel, idCM } = params;

    const model = await VerifyIDOFUser(idModel, "model");
    if (model !== null) {
      return model;
    }

    const moderator = await VerifyIDOFUser(idCM, "count-master");
    if (moderator !== null) {
      return moderator;
    }

    const service = new CountMasterModelsService();

    const ss = await service.Find({ idCM, idModel }, { limit: 10, page: 1 });
    if (ss !== null) {
      if (ss.docs) {
        if (ss.docs.length > 0) {
          return {
            response: "A subscription already exists with these ids",
            status: HTTP_RESPONSE.ACCEPTED,
          };
        }
      }
    }

    const modelService = new ModelService();

    const modelD = await modelService.FindById(idModel);
    if (modelD === null) {
      return ErrorReturn(
        "CountMaster",
        `Not exist a model whit this id ${idModel}`
      );
    }

    // Enviar Email

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Email Send to Model For Accept",
    };
  }

  @HttpMethods()
  async deleteUnsubscribe({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idModel, idCM } = params;

    const model = await VerifyIDOFUser(idModel, "model");
    if (model !== null) {
      return model;
    }

    const countmaster = await VerifyIDOFUser(idCM, "count-master");
    if (countmaster !== null) {
      return countmaster;
    }

    const service = new CountMasterModelsService();
    const mms = await service.Find({ idCM, idModel }, { limit: 10, page: 1 });
    if (mms === null) {
      return {
        response: "Not Follow whit this ids",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }
    // const mmss = mms.docs[0];
    // const unsubscribe = await service.Delete(mmss._id);
    // if (unsubscribe === null) {
    //   return ErrorReturn("Subscribe", "Error deleting");
    // }
    //Eliminar Seguiminto mas revisar si los pagso se hicieron
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "En revision para la dessupcripcion",
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
      "Count-Master-controller",
      `Interceptor of ${path.toUpperCase()}`
    );
    next();
  }
}

export const countMasterModelsController: CountMasterModelsController =
  new CountMasterModelsController();
