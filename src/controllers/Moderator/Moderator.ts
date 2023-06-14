import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";
import { IModerator } from "../../interfaces/IModerator";
import ModeratorService from "../../services/ModeratorService";

export default class ModeratorController extends Controller<
  IModerator,
  ModeratorService
> {
  public readonly path: string = "/moderator";

  /* GET */
  public readonly pathGetModerators = "/:idAdmin";
  public readonly pathGetModeratorById = "/:id";
  public readonly pathGetModeratorByVerificate: string = "/verificate/:idAdmin";

  /* POST */
  public readonly pathPostModerator = "/:idAdmin";

  /* PUT */
  public readonly pathPutModerator = "/:id";
  public readonly pathPutModeratorVerify = "/:idAdmin/:id";
  public readonly pathPutModeratorAddModel = "/add-model/:idAdmin/:id";
  public readonly pathPutModeratorImageVerificate = "/image-verificate/:id";

  /* DELETE */
  public readonly pathDeleteModerator = "/:id";

  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetModerators,
      plrs: false,
      plur: "Get Moderators need Admin Id",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetModeratorById,
      plrs: false,
      plur: "Get Moderators by Id",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetModeratorByVerificate,
      plrs: false,
      plur: "Get Moderators by Verifycate",
    },
    {
      type: METHODS_HTTP.POST,
      path: this.pathPostModerator,
      plrs: false,
      plur: "Get Moderators need Admin Id for Create",
    },
    {
      type: METHODS_HTTP.PUT,
      path: this.pathPutModerator,
      plrs: false,
      plur: "PUT Moderators need a Id for Update",
    },
    {
      type: METHODS_HTTP.PUT,
      path: this.pathPutModeratorVerify,
      plrs: false,
      plur: "PUT Moderators need Admin Id and Id Moderator for Verificated",
    },
    {
      type: METHODS_HTTP.PUT,
      path: this.pathPutModeratorAddModel,
      plrs: false,
      plur: "PUT Moderators need Admin Id and Id Moderator for Add Model to moderate",
    },
    {
      type: METHODS_HTTP.PUT,
      path: this.pathPutModeratorImageVerificate,
      plrs: false,
      plur: "PUT Moderators need Id Moderator for upload image verificated",
    },
    {
      type: METHODS_HTTP.DELETE,
      path: this.pathDeleteModerator,
      plrs: false,
      plur: "Need a Moderator Id for Delete a Moderate",
    },
  ];

  loggerController: Logger;
  service: ModeratorService;
  constructor() {
    super();
    this.loggerController = new Logger(EnumColorLogger.FgMagenta, "moderator");
    this.service = new ModeratorService();
    this.addInterceptor();
  }

  @HttpMethods(false)
  getModerators(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getModeratorById(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getModeratorByVerificate(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  postModerator(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  putModerator(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  putModeratorVerify(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  putModeratorImageVerificate(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  putModeratorAddModel(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  deleteModerator(_input: InputHttpMethodsArgument): ReturnMethod {
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

export const moderatorController: ModeratorController =
  new ModeratorController();
