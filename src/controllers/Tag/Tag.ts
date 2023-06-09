import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import { ITag } from "../../interfaces/ITag";
import TagService from "../../services/TagService";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";

export default class TagController extends Controller<ITag, TagService> {
  public readonly path: string = "/tag";

  /* GET */
  public readonly pathGetTags = "/";
  public readonly pathGetTagById = "/:id";

  /* POST */
  public readonly pathPostTag = "/:idAdmin";

  /* PUT */
  public readonly pathPutTagById = "/:idAdmin/:id";

  /* DELETE */
  public readonly pathDeleteTagById = "/:idAdmin/:id";

  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetTags,
      plrs: true,
      plur: "",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetTagById,
      plrs: false,
      plur: "",
    },
    {
      type: METHODS_HTTP.POST,
      path: this.pathPostTag,
      plrs: false,
      plur: "Need a Admin Id for Create a Tag",
    },
    {
      type: METHODS_HTTP.PUT,
      path: this.pathPutTagById,
      plrs: false,
      plur: "Need a Admin Id for Update a Tag",
    },
    {
      type: METHODS_HTTP.DELETE,
      path: this.pathDeleteTagById,
      plrs: false,
      plur: "Need a Admin Id for Delete a Tag",
    },
  ];
  loggerController: Logger;
  service: TagService;
  constructor() {
    super();
    this.loggerController = new Logger(EnumColorLogger.FgBlue, "tag");
    this.service = new TagService();
    this.addInterceptor();
  }

  @HttpMethods(false)
  getTags(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getTagById(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  postTag(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  putTagById(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  deleteTagById(_input: InputHttpMethodsArgument): ReturnMethod {
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
      "tag-controller",
      `Interceptor of ${path.toUpperCase()}`
    );
    next();
  }
}

export const tagController: TagController = new TagController();
