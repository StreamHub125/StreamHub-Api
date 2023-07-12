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
import { IModel, ModelDefault, keysOfIModel } from "../../interfaces/IModel";
import { VerifyIDOFUser, hasNextPaginate } from "../../utils/const";
import { ConvertObj } from "../../utils/ConvertObj";
import { keysOfIUser } from "../../interfaces/IUser";
import md5 from "md5";

export default class ModelController extends Controller<IModel, ModelService> {
  public readonly path = "/model";

  //Routes
  /* GETS */
  public readonly pathGetModels: string = "/";
  public readonly pathGetModelById: string = "/:id";

  /* POSTS */
  public readonly pathPostModel: string = "/";

  /* PUTS */
  public readonly pathPutModel: string = "/:id";
  public readonly pathPutModelImageSale: string = "/image-sale/:id";
  public readonly pathPutModelImageAvatar: string = "/avatar/:id";
  public readonly pathPutModelImageVerificate: string = "/image-verificate/:id";
  public readonly pathPutModelIsVerificate: string =
    "/is-verificate/:idAdmin/:id/:isV";

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

  @HttpMethods()
  async getModels(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const modelService = new ModelService();
    const limit = Number(input.query.limit) || 10;
    const page = Number(input.query.page) || 1;
    const { pathComplete, idAdmin, query } = input.body;

    const queryVerify = ConvertObj(keysOfIModel, query ? query : {});
    const vAdmin = await VerifyIDOFUser(idAdmin, "admin");
    const models = await modelService.Find(queryVerify, {
      limit,
      page,
    });

    const modelsWhitPageinate = hasNextPaginate(
      models,
      pathComplete,
      "/",
      limit,
      page
    );

    if (modelsWhitPageinate === null) {
      return {
        response: "Not Models",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    if (vAdmin === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: modelsWhitPageinate,
      };
    }

    modelsWhitPageinate.docs = modelsWhitPageinate.docs.map((model) => {
      return {
        _id: model._id,
        username: model.username,
        tag: model.tag,
        gender: model.gender,
        avatar: model.avatar ? model.avatar : "",
      };
    });

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: modelsWhitPageinate,
    };
  }

  @HttpMethods()
  async getModelById(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { id } = input.params;
    const service = new ModelService();

    const model = await service.FindById(id);
    if (model === null) {
      return {
        response: `Not Model whit this id: ${id}`,
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: {
        ...model,
        secret_key: "",
      },
    };
  }

  @HttpMethods()
  async postModel(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { body } = input;

    const modelVeri = ConvertObj(
      [...keysOfIUser, "gender"],
      body
    ) as Partial<IModel>;

    if (Object.keys(modelVeri).length === 0) {
      return {
        response: "The Content en body not is Aceptable",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }
    const service = new ModelService();

    const password = modelVeri.password ? modelVeri.password : "";

    const modelComplete: IModel = {
      ...ModelDefault,
      ...modelVeri,
      secret_key: "",
      password: md5(password),
    };

    // return {
    //   status: HTTP_RESPONSE.ACCEPTED,
    //   response: modelComplete,
    // };

    const modelcreate = await service.Create(modelComplete);

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: modelcreate,
    };
  }

  @HttpMethods()
  async putModel(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { body, params } = input;
    const { id } = params;

    const modelVeri = ConvertObj(
      [...keysOfIUser, "gender", "tag"],
      body
    ) as Partial<IModel>;

    if (Object.keys(modelVeri).length === 0) {
      return {
        response: "The Content en body.update not is Aceptable",
        status: HTTP_RESPONSE.NO_CONTENT,
      };
    }

    const service = new ModelService();

    const modelById = await service.FindById(id);

    if (modelById === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Model Whit This Id>>",
      };
    }

    const modelUpdates: IModel = {
      ...modelById,
      ...modelVeri,
    };

    const modelUpdate = await service.Update({ _id: id }, modelUpdates);

    if (modelUpdate === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: "Not Model Whit This Id",
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: modelUpdate,
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
