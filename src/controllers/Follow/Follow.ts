import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE } from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";
import { IFollow } from "../../interfaces/IFollow";
import FollowService from "../../services/FollowService";

export default class FollowController extends Controller<
  IFollow,
  FollowService
> {
  public readonly path: string = "/follow";

  /* GET */
  public readonly pathGetFollowModel = "/:idModel";
  public readonly pathGetFollowViewer = "/:idViewer";

  /* POST */
  public readonly pathPostSubscribe = "/subscribe/:idModel/:idViewer";

  /* DELETE */
  public readonly pathDeleteUnsubscribe = "/unsubscribe/:idModel/:idViewer";

  routesLog: ROUTESLOG[] = [];
  loggerController: Logger;
  service: FollowService;
  constructor() {
    super();
    this.loggerController = new Logger(EnumColorLogger.FgMagenta, "follow");
    this.service = new FollowService();
    this.addInterceptor();
  }

  @HttpMethods(false)
  getFollowModel(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getFollowViewer(_input: InputHttpMethodsArgument): ReturnMethod {
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

export const followController: FollowController = new FollowController();
