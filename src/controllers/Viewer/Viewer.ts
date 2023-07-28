import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import {
  InputHttpMethodsArgument,
  ROUTESLOG,
  ReturnMethod,
  WID,
} from "../../types";
import { Logger } from "../../utils/Logger";
import {
  EnumColorLogger,
  HTTP_RESPONSE,
  METHODS_HTTP,
  ROLES,
} from "../../types.enum";
import {
  IViewer,
  ViewerDefaoult,
  keysOfIViewer,
} from "../../interfaces/IViewer";
import ViewerService from "../../services/ViewerService";
import HttpMethods from "../../decorators/HttpMethods";
import {
  ErrorReturn,
  VerifyIDOFUser,
  hasNextPaginate,
} from "../../utils/const";
import { ConvertObj } from "../../utils/ConvertObj";
import md5 from "md5";

export default class ViewerController extends Controller<
  IViewer,
  ViewerService
> {
  public readonly path: string = "/viewer";

  /* GET */
  public readonly pathGetViewers = "/vs/:idAdmin";
  public readonly pathGetViewerById = "/v/:id";

  /* POST */
  public readonly pathPostViewer = "/";

  /* PUT */
  public readonly pathPutViewer = "/:id";

  /* DELETE */
  public readonly pathDeleteViewer = "/:id";

  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetViewers,
      plrs: true,
      plur: "GET all Viewers need id Admin ",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetViewerById,
      plrs: false,
      plur: "GET all Viewers need id Viewer ",
    },
    {
      type: METHODS_HTTP.POST,
      path: this.pathPostViewer,
      plrs: false,
      plur: "POST need a Viewer Element",
    },
    {
      type: METHODS_HTTP.PUT,
      path: this.pathPutViewer,
      plrs: false,
      plur: "PUT Viewer need Id Viewer and element to update",
    },
    {
      type: METHODS_HTTP.DELETE,
      path: this.pathDeleteViewer,
      plrs: false,
      plur: "DELETE Viewer need Id Viewer",
    },
  ];
  loggerController: Logger;
  service: ViewerService;
  constructor() {
    super();
    this.loggerController = new Logger(EnumColorLogger.FgMagenta, "viewer");
    this.service = new ViewerService();
    this.addInterceptor();
  }

  @HttpMethods()
  async getViewers(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const viewerService = new ViewerService();
    const limit = Number(input.query.limit) || 10;
    const page = Number(input.query.page) || 1;
    const { idAdmin } = input.params;
    const { pathComplete, query } = input.body;

    const queryVerify = ConvertObj(keysOfIViewer, query ? query : {});
    const vAdmin = await VerifyIDOFUser(idAdmin, "admin");
    const viewer = await viewerService.Find(queryVerify, {
      limit,
      page,
    });

    if (vAdmin !== null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: "Not Admin Whit this Id",
      };
    }

    const viewersWhitPageinate = hasNextPaginate(
      viewer,
      pathComplete,
      `/${idAdmin}`,
      limit,
      page
    );

    if (viewersWhitPageinate === null) {
      return {
        response: "Not Viewers",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: viewersWhitPageinate,
    };
  }

  @HttpMethods()
  async getViewerById(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = input.params;
    const { client, idUser } = input.body;
    const service = new ViewerService();
    if (
      client !== ROLES.MODEL &&
      client !== ROLES.MODERATOR &&
      client !== ROLES.VIEWER &&
      client !== ROLES.ADMIN
    ) {
      return {
        response: "Type not is acceptable",
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
      };
    }

    if (idUser === undefined || idUser === null) {
      return {
        response: "id of User Required",
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
      };
    }

    const viewerF = (await service.FindById(id)) as WID<IViewer>;
    if (viewerF === null) {
      return {
        response: `Not Viewer whit this id: ${id}`,
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }
    let viewer: Partial<WID<IViewer>> = viewerF;

    if (client === ROLES.ADMIN) {
      const adminReview = await VerifyIDOFUser(idUser, "admin");

      if (adminReview !== null) {
        return {
          response: "Not Admin Whit this Id",
          status: HTTP_RESPONSE.ACCEPTED,
        };
      }
      viewer = viewer;
    } else if (client === ROLES.VIEWER) {
      const viewerReview = await VerifyIDOFUser(idUser, "viewer");
      if (viewerReview !== null) {
        return {
          response: "Not Viewer Whit this Id",
          status: HTTP_RESPONSE.ACCEPTED,
        };
      }
      if (JSON.stringify(viewerF._id) !== `"${idUser}"`) {
        return {
          response: "Your Not this Viewer",
          status: HTTP_RESPONSE.ACCEPTED,
        };
      }
    } else if (client === ROLES.MODERATOR) {
      const moderatorService = await VerifyIDOFUser(idUser, "moderator");
      if (moderatorService !== null) {
        return moderatorService;
      }
      viewer = {
        _id: viewerF._id,
        username: viewerF.username,
        gender: viewerF.gender,
      };
    } else if (client === ROLES.MODEL) {
      const modelV = await VerifyIDOFUser(idUser, "model");
      if (modelV !== null) {
        return modelV;
      }
      viewer = {
        _id: viewerF._id,
        username: viewerF.username,
        gender: viewerF.gender,
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: viewer,
    };
  }

  @HttpMethods()
  async postViewer(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { body } = input;

    const viewerVei = ConvertObj([...keysOfIViewer], body) as Partial<IViewer>;

    if (Object.keys(viewerVei).length === 0) {
      return {
        response: "The Content en body not is Aceptable",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }
    const service = new ViewerService();

    const password = viewerVei.password ? viewerVei.password : "";

    const viewerComplete: IViewer = {
      ...ViewerDefaoult,
      ...viewerVei,
      password: md5(password),
      cc: "***",
    };

    const viewerCreate = await service.Create(viewerComplete);

    if (viewerCreate === null) {
      return ErrorReturn("Viewer");
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: viewerCreate,
    };
  }

  @HttpMethods()
  async putViewer(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { body, params } = input;
    const { id } = params;
    const fA = ["email", "username"];
    const kesy = keysOfIViewer.filter((e) => !fA.includes(e));
    const viewerVe = ConvertObj([...kesy], body) as Partial<IViewer>;

    if (Object.keys(viewerVe).length === 0) {
      return {
        response: "The Content en body.update not is Aceptable",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    const service = new ViewerService();

    const viewerById = await service.FindById(id);

    if (viewerById === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Viewer Whit This Id>>",
      };
    }
    const viewerdUpdate = await service.Update({ _id: id }, viewerVe);

    if (viewerdUpdate === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Model Whit This Id",
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: viewerdUpdate,
    };
  }

  @HttpMethods()
  async deleteViewer({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = params;
    const viewerService = new ViewerService();

    const viewer = await VerifyIDOFUser(id, "viewer");
    if (viewer !== null) {
      return viewer;
    }

    const deleting = await viewerService.Delete(id);

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: deleting,
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
