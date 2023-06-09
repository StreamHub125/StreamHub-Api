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
  /* GETS */
  public readonly pathGetModels: string = "/";
  public readonly pathGetModelById: string = "/:id";
  public readonly pathGetModelByVerificate: string = "/verificate";
  public readonly pathGetModelByTag: string = "/tag/:tag";
  public readonly pathGetModelByLive: string = "/live";
  public readonly pathGetModelByPopularity: string = "/popularity";
  public readonly pathGetModelByPopularityTag: string = "/popularity/:tag";

  /* POSTS */
  public readonly pathPostModel: string = "/";

  /* PUTS */
  public readonly pathPutModel: string = "/:id";
  public readonly pathPutModelImageSale: string = "/image-sale/:id";
  public readonly pathPutModelImageAvatar: string = "/avatar/:id";
  public readonly pathPutModelImageVerificate: string = "/image-verificate/:id";
  public readonly pathPutModelIsVerificate: string = "/is-verificate/:id";

  /* DELETES */
  public readonly pathDeleteModel: string = "/:id";
  //Finish Routes

  service: ModelService;
  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      plur: "By Limit and page {url}?limit=5&page=1", // Example "By ID"
      path: this.pathGetModels,
      plrs: true,
    },
    {
      type: METHODS_HTTP.GET,
      plur: "By Id", // Example "By ID"
      path: this.pathGetModelById,
      plrs: false,
    },
    {
      type: METHODS_HTTP.GET,
      plur: "By Verificate Limit and page {url}?limit=5&page=1", // Example "By ID"
      path: this.pathGetModelByVerificate,
      plrs: true,
    },
    {
      type: METHODS_HTTP.GET,
      plur: "By Tag Limit and page {url}?limit=5&page=1", // Example "By ID"
      path: this.pathGetModelByTag,
      plrs: true,
    },
    {
      type: METHODS_HTTP.GET,
      plur: "By Live Limit and page {url}?limit=5&page=1", // Example "By ID"
      path: this.pathGetModelByLive,
      plrs: true,
    },
    {
      type: METHODS_HTTP.GET,
      plur: "By Popularity Limit and page {url}?limit=5&page=1", // Example "By ID"
      path: this.pathGetModelByPopularity,
      plrs: true,
    },
    {
      type: METHODS_HTTP.GET,
      plur: "By Popularity Tag Limit and page {url}?limit=5&page=1", // Example "By ID"
      path: this.pathGetModelByPopularityTag,
      plrs: true,
    },
    {
      type: METHODS_HTTP.POST,
      plur: "Receives Body type IModel", // Example "By ID"
      path: this.pathPostModel,
      plrs: false,
    },
    {
      type: METHODS_HTTP.PUT,
      plur: "By id Receives Body type Omit<IModel, 'isVerificate'>", // Example "By ID"
      path: this.pathPutModel,
      plrs: false,
    },
    {
      type: METHODS_HTTP.PUT,
      plur: "By id Receives Body type Avatar Image", // Example "By ID"
      path: this.pathPutModelImageAvatar,
      plrs: false,
    },
    {
      type: METHODS_HTTP.PUT,
      plur: "By id Receives Body type {photo: file<Image>, price: number}", // Example "By ID"
      path: this.pathPutModelImageSale,
      plrs: false,
    },
    {
      type: METHODS_HTTP.PUT,
      plur: "By id Receives Body type Verificate Image", // Example "By ID"
      path: this.pathPutModelImageVerificate,
      plrs: false,
    },
    {
      type: METHODS_HTTP.PUT,
      plur: "By id and idAdmin and boolean 0 = true 1 = false", // Example "By ID"
      path: this.pathPutModelIsVerificate,
      plrs: false,
    },
    {
      type: METHODS_HTTP.DELETE,
      plur: "By id", // Example "By ID"
      path: this.pathDeleteModel,
      plrs: false,
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

  @HttpMethods(false)
  getModelById(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz Id",
    };
  }

  @HttpMethods(false)
  getModelByVerificate(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz",
    };
  }

  @HttpMethods(false)
  getModelByTag(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz Tag",
    };
  }

  @HttpMethods(false)
  getModelByLive(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz",
    };
  }

  @HttpMethods(false)
  getModelByPopularity(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz",
    };
  }

  @HttpMethods(false)
  getModelByPopularityTag(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz",
    };
  }

  @HttpMethods(false)
  postModel(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz",
    };
  }

  @HttpMethods(false)
  putModel(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz",
    };
  }

  @HttpMethods(false)
  putModelImageSale(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz",
    };
  }

  @HttpMethods(false)
  putModelImageAvatar(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz",
    };
  }

  @HttpMethods(false)
  putModelImageVerificate(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz",
    };
  }

  @HttpMethods(false)
  putModelIsVerificate(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Recibido Daniel Campaz",
    };
  }

  @HttpMethods(false)
  deleteModel(_input: InputHttpMethodsArgument): ReturnMethod {
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
