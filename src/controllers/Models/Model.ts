import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import { Logger } from "../../utils/Logger";
import HttpMethods from "../../decorators/HttpMethods";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import ModelService from "../../services/ModelService";
import { IModel } from "../../interfaces/IModel";

export default class ModelController extends Controller<IModel, ModelService> {
  public readonly path: string = "/model";

  //Routes
  public readonly pathGetModel: string = "/";
  //Finish Routes

  service: ModelService;
  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      plur: "", // Example "By ID"
      path: this.pathGetModel,
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

  // GET Model by id
  // GET Models
  // GET Models by Verificate
  // GET Models by Tag
  // GET Models by Live
  // GET Models by Popularidad
  // GET Models by Popularidad of Tag
  // POST Model
  // PUT Model by Filter
  // PUT Model Update Images Com
  // PUT Model Update Image Avatar
  // PUT Model Update Image Verificate
  // PUT Model Is Verificate
  // DELETE Model by id
  @HttpMethods(false)
  getModel(_input: InputHttpMethodsArgument): ReturnMethod {
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
