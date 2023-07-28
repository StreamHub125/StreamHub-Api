import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";
import { IModeratorsModels } from "../../interfaces/IModerators-Models";
import ModeratorsModelsService from "../../services/Moderators-ModelsService";
import {
  ErrorReturn,
  VerifyIDOFUser,
  hasNextPaginate,
} from "../../utils/const";

export default class ModeratorsModelsController extends Controller<
  IModeratorsModels,
  ModeratorsModelsService
> {
  public readonly path: string = "/moderators-models";

  /* GET */
  public readonly pathGetMDSModel = "/model/:idModel";
  public readonly pathGetMDSModerator = "/moderator/:idModerator";

  /* POST */
  public readonly pathPostSubscribe =
    "/subscribe/:idAdmin/:idModel/:idModerator";

  /* DELETE */
  public readonly pathDeleteUnsubscribe =
    "/unsubscribe/:idAdmin/:idModel/:idModerator";

  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetMDSModel,
      plrs: false,
      plur: "Get Moderators - Models by Model need Model Id",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetMDSModerator,
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
  service: ModeratorsModelsService;
  constructor() {
    super();
    this.loggerController = new Logger(
      EnumColorLogger.FgMagenta,
      "moderators-models"
    );
    this.service = new ModeratorsModelsService();
    this.addInterceptor();
  }

  @HttpMethods()
  async getMDSModel({
    params,
    query,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idModel } = params;
    const { pathComplete } = body;
    const service = new ModeratorsModelsService();
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;

    const user = await VerifyIDOFUser(idModel, "model");

    if (user !== null) {
      return user;
    }

    const models = await service.Find({ idModel }, { limit, page });

    if (models === null) {
      return {
        response: "",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }
    const mdsModelsWhitPageinate = hasNextPaginate(
      models,
      pathComplete,
      "/model",
      limit,
      page
    );

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: mdsModelsWhitPageinate,
    };
  }

  @HttpMethods()
  async getMDSModerator({
    body,
    params,
    query,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idModerator } = params;
    const { pathComplete } = body;
    const service = new ModeratorsModelsService();
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;

    const user = await VerifyIDOFUser(idModerator, "moderator");

    if (user !== null) {
      return user;
    }

    const moderator = await service.Find({ idModerator }, { limit, page });

    if (moderator === null) {
      return {
        response: "",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }
    const mdsModeratorWhitPageinate = hasNextPaginate(
      moderator,
      pathComplete,
      "/moderator",
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
    const { idAdmin, idModel, idModerator } = params;

    const admin = await VerifyIDOFUser(idAdmin, "admin");
    if (admin !== null) {
      return admin;
    }

    const model = await VerifyIDOFUser(idModel, "model");
    if (model !== null) {
      return model;
    }

    const moderator = await VerifyIDOFUser(idModerator, "moderator");
    if (moderator !== null) {
      return moderator;
    }

    const service = new ModeratorsModelsService();

    const ss = await service.Find({ idAdmin, idModel }, { limit: 10, page: 1 });
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

    const mm = await service.Create({
      idModel,
      idModerator,
    });

    if (mm === null) {
      return ErrorReturn("Subscrribe Models And Moderator");
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Subscribe",
    };
  }

  @HttpMethods()
  async deleteUnsubscribe({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idAdmin, idModel, idModerator } = params;

    const admin = await VerifyIDOFUser(idAdmin, "admin");
    if (admin !== null) {
      return admin;
    }

    const model = await VerifyIDOFUser(idModel, "model");
    if (model !== null) {
      return model;
    }

    const moderator = await VerifyIDOFUser(idModerator, "moderator");
    if (moderator !== null) {
      return moderator;
    }

    const service = new ModeratorsModelsService();
    const mms = await service.Find(
      { idAdmin, idModel },
      { limit: 10, page: 1 }
    );
    if (mms === null) {
      return {
        response: "Not Follow whit this ids",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }
    const mmss = mms.docs[0];
    const unsubscribe = await service.Delete(mmss._id);
    if (unsubscribe === null) {
      return ErrorReturn("Subscribe", "Error deleting");
    }
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Unsubscribe",
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
      "Moderators-Models-controller",
      `Interceptor of ${path.toUpperCase()}`
    );
    next();
  }
}

export const moderatorsModelsController: ModeratorsModelsController =
  new ModeratorsModelsController();
