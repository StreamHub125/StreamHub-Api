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

export default class ModeratorsModelsController extends Controller<
  IModeratorsModels,
  ModeratorsModelsService
> {
  public readonly path: string = "/moderators-models";

  /* GET */
  public readonly pathGetMDSModel = "/:idModel";
  public readonly pathGetMDSModerator = "/:idModerator";

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

  @HttpMethods(false)
  getMDSModel(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getMDSModerator(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  postSubscribe(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  deleteUnsubscribe(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
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

export const moderatorsModelsController: ModeratorsModelsController =
  new ModeratorsModelsController();
