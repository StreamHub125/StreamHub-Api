import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";
import { IFollow } from "../../interfaces/IFollow";
import FollowService from "../../services/FollowService";
import { ErrorReturn, VerifyID, hasNextPaginate } from "../../utils/const";
import ViewerService from "../../services/ViewerService";
import ModelService from "../../services/ModelService";

export default class FollowController extends Controller<
  IFollow,
  FollowService
> {
  public readonly path: string = "/follow";

  /* GET */
  public readonly pathGetFollowModel = "/model/:idModel";
  public readonly pathGetFollowViewer = "/viewer/:idViewer";

  /* POST */
  public readonly pathPostSubscribe = "/subscribe/:idModel/:idViewer";

  /* DELETE */
  public readonly pathDeleteUnsubscribe = "/unsubscribe/:idModel/:idViewer";

  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetFollowModel,
      plrs: false,
      plur: "Get Subscribe in the Model required Param idModel",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetFollowViewer,
      plrs: false,
      plur: "Get Subscribe in the Viewer required Param idViewer",
    },
    {
      type: METHODS_HTTP.POST,
      path: this.pathPostSubscribe,
      plrs: false,
      plur: "Need a Model Id and Viewer Id for Create a Follow",
    },
    {
      type: METHODS_HTTP.DELETE,
      path: this.pathDeleteUnsubscribe,
      plrs: false,
      plur: "Need a Model Id and Viewer Id for Delete a Follow",
    },
  ];
  loggerController: Logger;
  service: FollowService;
  constructor() {
    super();
    this.loggerController = new Logger(EnumColorLogger.FgMagenta, "follow");
    this.service = new FollowService();
    this.addInterceptor();
  }

  @HttpMethods()
  async getFollowModel({
    params,
    query,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const service = new FollowService();
    const { idModel } = params;
    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const modelVerify = await VerifyID(idModel, new ModelService(), "Model");
    if (modelVerify !== null) return modelVerify;
    const { pathComplete } = body;
    const follows = await service.Find(
      { idModel },
      {
        limit,
        page,
      }
    );

    const followsWhitPageinate = hasNextPaginate(
      follows,
      pathComplete,
      `/model/${idModel}`,
      limit,
      page
    );

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: followsWhitPageinate,
    };
  }

  @HttpMethods()
  async getFollowViewer({
    params,
    query,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const service = new FollowService();
    const { idViewer } = params;
    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const viewerVerify = await VerifyID(
      idViewer,
      new ViewerService(),
      "Viewer"
    );
    if (viewerVerify !== null) return viewerVerify;
    const follows = await service.Find(
      { idViewer },
      {
        limit,
        page,
      }
    );

    const { pathComplete } = body;

    const followsWhitPageinate = hasNextPaginate(
      follows,
      pathComplete,
      `/viewer/${idViewer}`,
      limit,
      page
    );

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: followsWhitPageinate,
    };
  }

  @HttpMethods()
  async postSubscribe({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idModel, idViewer } = params;

    const viewerVerify = await VerifyID(
      idViewer,
      new ViewerService(),
      "Viewer"
    );
    const modelVerify = await VerifyID(idModel, new ModelService(), "Model");
    let vr: ReturnMethod | null = null;
    if (viewerVerify !== null) {
      vr = viewerVerify;
    }

    if (modelVerify !== null) {
      if (vr !== null) {
        vr.response = `${vr.response} and ${modelVerify.response}`;
      } else {
        vr = modelVerify;
      }
    }

    if (vr !== null) {
      return vr;
    }

    const service = new FollowService();

    const follow = await service.Create({
      idModel,
      idViewer,
    });

    if (follow === null) {
      return ErrorReturn("Follow");
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Subscribed",
    };
  }

  @HttpMethods()
  async deleteUnsubscribe({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idModel, idViewer } = params;

    const viewerVerify = await VerifyID(
      idViewer,
      new ViewerService(),
      "Viewer"
    );
    const modelVerify = await VerifyID(idModel, new ModelService(), "Model");
    let vr: ReturnMethod | null = null;
    if (viewerVerify !== null) {
      vr = viewerVerify;
    }

    if (modelVerify !== null) {
      if (vr !== null) {
        vr.response = `${vr.response} and ${modelVerify.response}`;
      } else {
        vr = modelVerify;
      }
    }

    if (vr !== null) {
      return vr;
    }

    const service = new FollowService();
    const followSystem = await service.FindS({ idModel, idViewer });
    if (followSystem === null || followSystem === undefined)
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Error Find by idModel and idViewer",
      };

    if (followSystem._id) {
      await service.Delete(followSystem._id);
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: "UnSubscribed",
      };
    }

    return {
      status: HTTP_RESPONSE.NO_CONTENT,
      response: "Error Find by idModel and idViewer in Id",
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
      "Follow-controller",
      `Interceptor of ${path.toUpperCase()}`
    );
    next();
  }
}

export const followController: FollowController = new FollowController();
