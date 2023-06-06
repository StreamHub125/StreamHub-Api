import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import { Logger } from "../../utils/Logger";
import HttpMethods from "../../decorators/HttpMethods";
import { InputHttpMethodsArgument, ReturnMethod } from "../../types";
import ModelService from "../../services/ModelService";
import { IModel } from "../../interfaces/IModel";

export default class ModelController extends Controller<IModel, ModelService> {
  public readonly path: string = "/model";

  //Routes
  public readonly pathGetModels: string = "/";

  service: ModelService;
  routesLog: { type: METHODS_HTTP; plur: string; path: string }[] = [
    {
      type: METHODS_HTTP.GET,
      plur: "",
      path: this.pathGetModels,
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

  @HttpMethods(false)
  getModels(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz",
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
