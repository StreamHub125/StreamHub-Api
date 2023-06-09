import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { IGender } from "../../interfaces/IGender";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import GenderService from "../../services/GenderService";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";

export default class GenderController extends Controller<
  IGender,
  GenderService
> {
  public readonly path: string = "/gender";

  /* GET */
  public readonly pathGetGenders = "/";
  public readonly pathGetGenderById = "/:id";

  /* POST */
  public readonly pathPostGender = "/:idAdmin";

  /* PUT */
  public readonly pathPutGenderById = "/:idAdmin/:id";

  /* DELETE */
  public readonly pathDeleteGenderById = "/:idAdmin/:id";

  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetGenders,
      plrs: true,
      plur: "",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetGenderById,
      plrs: false,
      plur: "",
    },
    {
      type: METHODS_HTTP.POST,
      path: this.pathPostGender,
      plrs: false,
      plur: "Need a Admin Id for Create a Gender",
    },
    {
      type: METHODS_HTTP.PUT,
      path: this.pathPutGenderById,
      plrs: false,
      plur: "Need a Admin Id for Update a Gender",
    },
    {
      type: METHODS_HTTP.DELETE,
      path: this.pathDeleteGenderById,
      plrs: false,
      plur: "Need a Admin Id for Delete a Gender",
    },
  ];

  loggerController: Logger;
  service: GenderService;
  constructor() {
    super();
    this.loggerController = new Logger(EnumColorLogger.FgCyan, "gender");
    this.service = new GenderService();
    this.addInterceptor();
  }

  @HttpMethods(false)
  getGenders(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getGenderById(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  postGender(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  putGenderById(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  deleteGenderById(_input: InputHttpMethodsArgument): ReturnMethod {
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
      "Gender-controller",
      `Interceptor of ${path.toUpperCase()}`
    );
    next();
  }
}

export const genderController: GenderController = new GenderController();
