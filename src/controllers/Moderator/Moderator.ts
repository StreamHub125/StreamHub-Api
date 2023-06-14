import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE } from "../../types.enum";
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
  public readonly pathGetModeratorByVerificate: string = "/verificate";

  /* POST */
  public readonly pathPostModerator = "/";

  /* PUT */
  public readonly pathPutModerator = "/:id";
  public readonly pathPutModeratorVerify = "/:idAdmin/:id";
  public readonly pathPutModeratorAddModel = "/add-model/:idAdmin/:id";
  public readonly pathPutModeratorImageVerificate = "/image-verificate/:id";

  /* DELETE */
  public readonly pathDeleteModerator = "/:id";

  routesLog: ROUTESLOG[] = [];
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
