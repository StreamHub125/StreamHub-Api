import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";
import { IHistory } from "../../interfaces/IHistory";
import HistoryService from "../../services/HistoryService";
import { VerifyID, VerifyIDOFUser, hasNextPaginate } from "../../utils/const";
import AdminService from "../../services/AdminService";

export default class HistoryController extends Controller<
  IHistory,
  HistoryService
> {
  public readonly path: string = "/streams-history";

  /* GET */
  public readonly pathGetHistorys = "/:idAdmin";
  public readonly pathGetHistorysById = "/:type/:idUser/:id";
  public readonly pathGetHistoryByModelId = "/model/:idModel";
  public readonly pathGetHistoryByModeratorId = "/moderator/:idModerator";
  public readonly pathGetHistoryByDate = "/date/:type/:idUser/:date"; //TODO: Optimizar esta funcion

  /* DELETE */
  public readonly pathDeleteHistory = "/:idAdmin/:idHostory";

  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetHistorys,
      plrs: false,
      plur: "Get All Historys required Param idAdmin",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetHistorysById,
      plrs: false,
      plur: "Get History by id required Param id of History in Db",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetHistoryByModelId,
      plrs: false,
      plur: "Get History of the models required Param id of Model",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetHistoryByModeratorId,
      plrs: false,
      plur: "Get History of the moderator required Param id of Moderator",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetHistoryByDate,
      plrs: false,
      plur: "Get History by Date required Param Date example { A Definir }", //FIXME: Organizar aqui tambien
    },
    {
      type: METHODS_HTTP.DELETE,
      path: this.pathDeleteHistory,
      plrs: false,
      plur: "Need a Admin and History Id and for Delete a History",
    },
  ];
  loggerController: Logger;
  service: HistoryService;
  constructor() {
    super();
    this.loggerController = new Logger(EnumColorLogger.FgYellow, "history");
    this.service = new HistoryService();
    this.addInterceptor();
  }

  @HttpMethods()
  async getHistorys({
    params,
    query,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idAdmin } = params;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const verifyAdmin = await VerifyID(idAdmin, new AdminService(), "Admin");
    if (verifyAdmin !== null) return verifyAdmin;

    const pathComplete = body.pathComplete;
    const service = new HistoryService();

    const history = hasNextPaginate(
      await service.Find({}, { limit, page }),
      pathComplete,
      `/${idAdmin}`,
      limit,
      page
    );

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: history,
    };
  }

  @HttpMethods()
  async getHistoryById({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { type, idUser, id } = params;
    const verifyAdmin = await VerifyIDOFUser(idUser, type);
    if (verifyAdmin !== null) return verifyAdmin;

    const service = new HistoryService();

    const history = await service.FindById(id);

    if (history === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: `No content whit this id = ${id}`,
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: history,
    };
  }

  @HttpMethods()
  async getHistoryByModelId({
    params,
    query,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idModel } = params;
    const verifyAdmin = await VerifyIDOFUser(idModel, "model");
    if (verifyAdmin !== null) return verifyAdmin;

    const service = new HistoryService();

    const limit = query.limit || 10;
    const page = query.page || 1;

    const history = await service.Find({ idModel }, { limit, page });

    if (history === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: `No content whit this id Model = ${idModel}`,
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: history,
    };
  }

  @HttpMethods()
  async getHistoryByModeratorId({
    params,
    query,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idModerator } = params;
    const verifyAdmin = await VerifyIDOFUser(idModerator, "moderator");
    if (verifyAdmin !== null) return verifyAdmin;

    const service = new HistoryService();

    const limit = query.limit || 10;
    const page = query.page || 1;

    const history = await service.Find({ idModerator }, { limit, page });

    if (history === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: `No content whit this id Moderator = ${idModerator}`,
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: history,
    };
  }

  @HttpMethods()
  async getHistoryByDate({
    params,
    query,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { type, idUser, date } = params;
    const verifyAdmin = await VerifyIDOFUser(idUser, type);
    if (verifyAdmin !== null) return verifyAdmin;

    const service = new HistoryService();

    const limit = query.limit || 10;
    const page = query.page || 1;

    const history = await service.Find({ date }, { limit, page });

    if (history === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: `No content whit this Date = ${date}`,
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: history,
    };
  }

  @HttpMethods()
  async deleteHistory({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idAdmin, idHostory } = params;
    const verifyAdmin = await VerifyIDOFUser(idAdmin, "admin");
    if (verifyAdmin !== null) return verifyAdmin;

    const service = new HistoryService();

    const history = await service.Delete(idHostory);

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: history,
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
      "History-Controller",
      `Interceptor of ${path.toUpperCase()}`
    );
    next();
  }
}

export const historyController: HistoryController = new HistoryController();
