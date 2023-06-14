import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE } from "../../types.enum";
import { IViewer } from "../../interfaces/IViewer";
import ViewerService from "../../services/ViewerService";
import HttpMethods from "../../decorators/HttpMethods";

export default class ViewerController extends Controller<
  IViewer,
  ViewerService
> {
  public readonly path: string = "/viewer";

  /* GET */
  public readonly pathGetViewers = "/:idAdmin";
  public readonly pathGetViewerById = "/:id";

  /* POST */
  public readonly pathPostViewer = "/";

  /* PUT */
  public readonly pathPutViewer = "/:id";

  /* DELETE */
  public readonly pathDeleteViewer = "/:id";

  routesLog: ROUTESLOG[] = [];
  loggerController: Logger;
  service: ViewerService;
  constructor() {
    super();
    this.loggerController = new Logger(EnumColorLogger.FgMagenta, "viewer");
    this.service = new ViewerService();
    this.addInterceptor();
  }

  @HttpMethods(false)
  getViewers(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getViewerById(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  postViewer(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  putViewer(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  deleteViewer(_input: InputHttpMethodsArgument): ReturnMethod {
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

export const viewerController: ViewerController = new ViewerController();
