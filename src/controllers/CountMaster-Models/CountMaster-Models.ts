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
import HttpMethods from "../../decorators/HttpMethods";
import {
  CodeGenerator,
  ErrorReturn,
  VerifyIDOFUser,
  hasNextPaginate,
} from "../../utils/const";
import CountMasterModelsService from "../../services/CountMaster-Models";
import { ICountMasterModels } from "../../interfaces/ICountMaster-Models";
import ModelService from "../../services/ModelService";
import CountMasterModelsDeletingService from "../../services/CodeService";
import CodeService from "../../services/CodeService";
import { CODETYPE, CODETYPEACTION, ICode } from "../../interfaces/ICode";
import CountMasterService from "../../services/CountMasterService";
import { ICountMaster } from "../../interfaces/ICountMaster";
import ModeratorsModelsService from "../../services/Moderators-ModelsService";

export default class CountMasterModelsController extends Controller<
  ICountMasterModels,
  CountMasterModelsService
> {
  public readonly path: string = "/countmaster-models";

  /* GET */
  public readonly pathGetMDSModel = "/model/:idModel";
  public readonly pathGetMDSCountmaster = "/countmaster/:idCM";

  /* POST */
  public readonly pathPostSubscribe = "/subscribe/:idModel/:idCM";
  public readonly pathPostSubscribeConfirm = "/confirm-subscribe/:code";

  /* DELETE */
  public readonly pathDeleteUnsubscribe = "/unsubscribe/:idModel/:idCM";
  public readonly pathDeleteUnsubscribeConfirm = "/confirm-unsubscribe/:code";

  routesLog: ROUTESLOG[] = [
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetMDSModel,
      plrs: false,
      plur: "Get CountMaster - Models by Model need Model Id",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetMDSCountmaster,
      plrs: false,
      plur: "Get CountMaster - Models by CountMaster need CountMaster Id",
    },
    {
      type: METHODS_HTTP.POST,
      path: this.pathPostSubscribe,
      plrs: false,
      plur: "Subscribe Id Model and Id CountMaster",
    },
    {
      type: METHODS_HTTP.POST,
      path: this.pathPostSubscribeConfirm,
      plrs: false,
      plur: "Confirm Subscribe, Id Model and Id CountMaster",
    },
    {
      type: METHODS_HTTP.DELETE,
      path: this.pathDeleteUnsubscribeConfirm,
      plrs: false,
      plur: "Unsubscribe need, Id Model and Id CountMaster",
    },
    {
      type: METHODS_HTTP.DELETE,
      path: this.pathDeleteUnsubscribe,
      plrs: false,
      plur: "Unsubscribe, Id Model and Id Moderator",
    },
  ];
  loggerController: Logger;
  service: CountMasterModelsService;
  constructor() {
    super();
    this.loggerController = new Logger(
      EnumColorLogger.FgMagenta,
      "countmaster-models"
    );
    this.service = new CountMasterModelsService();
    this.addInterceptor();
  }

  @HttpMethods()
  async getMDSModel({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idModel } = params;
    const service = new CountMasterModelsService();

    const user = await VerifyIDOFUser(idModel, "model");

    if (user !== null) {
      return user;
    }

    const models = await service.Find({ idModel }, { limit: 10, page: 1 });

    if (models === null) {
      return {
        response: "Not model associate whit this count master",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    if (models.docs) {
      if (models.docs[0]) {
        return {
          status: HTTP_RESPONSE.ACCEPTED,
          response: models.docs[0],
        };
      } else {
        return {
          status: HTTP_RESPONSE.ACCEPTED,
          response: "The model no exist in count master",
        };
      }
    } else {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: "The model no exist in count master",
      };
    }
  }

  @HttpMethods()
  async getMDSCountmaster({
    body,
    params,
    query,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idCM } = params;
    const { pathComplete } = body;
    const service = new CountMasterModelsService();
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;

    const user = await VerifyIDOFUser(idCM, "count-master");

    if (user !== null) {
      return user;
    }

    const countmasterModle = await service.Find({ idCM }, { limit, page });

    if (countmasterModle === null) {
      return {
        response: "Not Exist",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }
    const mdsModeratorWhitPageinate = hasNextPaginate(
      countmasterModle,
      pathComplete,
      `/countmaster-models/countmaster/${idCM}`,
      limit,
      page
    );

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: mdsModeratorWhitPageinate,
    };
  }

  @HttpMethods()
  async postSubscribe({
    params,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    //:idAdmin/:idModel/:idModerator"
    const { idModel, idCM } = params;
    const { hInit } = body;

    if (hInit === undefined || hInit === null) {
      return ErrorReturn("CountMaster-Models", "Type is required");
    }

    if (hInit !== "count-master" || hInit !== "model") {
      return ErrorReturn("CountMaster-Models", "Type is not Aceptable");
    }

    const model = await VerifyIDOFUser(idModel, "model");
    if (model !== null) {
      return model;
    }

    const countMaster = await VerifyIDOFUser(idCM, "count-master");
    if (countMaster !== null) {
      return countMaster;
    }

    const service = new CountMasterModelsService();

    const ss = await service.Find({ idModel }, { limit: 10, page: 1 });
    if (ss !== null) {
      if (ss.docs) {
        if (ss.docs.length > 0) {
          return {
            response: "A subscription already exists for this model",
            status: HTTP_RESPONSE.ACCEPTED,
          };
        }
      }
    }
    const code = `${idCM}${idModel}`;

    const codeService = new CodeService();
    const createCode = await codeService.Create({
      action: CODETYPEACTION.CREATE,
      code: CodeGenerator(code),
      hInit,
      types: hInit === "model" ? CODETYPE.MODEL : CODETYPE.COUNTMASTER,
      doc: {
        idCM,
        idModel,
      },
    });

    if (createCode === null) {
      return {
        status: HTTP_RESPONSE.ACCEPTED,
        response: "Error To Create Code to Accept",
      };
    }

    const modelService = new ModelService();

    const modelD = await modelService.FindById(idModel);
    if (modelD === null) {
      return ErrorReturn(
        "CountMaster",
        `Not exist a model whit this id ${idModel}`
      );
    }

    //TODO: Email Enviar Email

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Email Send to Model For Accept",
    };
  }

  @HttpMethods()
  async postSubscribeConfirm({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { code } = params;

    const codeCModel = (await new CodeService().FindByCode(
      code
    )) as ICode | null;
    if (codeCModel === null) {
      return {
        response: "Not Code of This CodeThere is no confirmation for this code",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    const service = new CountMasterModelsService();
    const mms = (await service.FindByCode(
      code
    )) as WID<ICountMasterModels> | null;
    if (mms === null) {
      return {
        response: "Not Associated whit this ids",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    if (codeCModel.action !== CODETYPEACTION.CREATE) {
      return {
        response: "The action is not create",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    if (codeCModel.code !== mms.code) {
      return {
        response: "The code is not the same",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    const countMaster = new CountMasterService();
    const aSa = (await countMaster.FindById(
      mms.idCountMaster
    )) as WID<ICountMaster>;
    if (aSa === null) {
      return ErrorReturn("Count Master Models", "Error To Get Count Msster");
    }
    const moderatorModelsCountMaster = await new ModeratorsModelsService().Find(
      { idModel: mms.idModel, idModerator: aSa._id },
      { limit: 1, page: 1 }
    );

    if (moderatorModelsCountMaster === null) {
      return ErrorReturn("Count Master Models", "Error To Get Count Msster");
    }

    if (moderatorModelsCountMaster.docs) {
      if (moderatorModelsCountMaster.docs.length < 0) {
        return ErrorReturn(
          "Count Master Models",
          "Error to search Relation Model Moderator"
        );
      }
    }

    if (codeCModel.doc) {
      if (codeCModel.doc.idCM && codeCModel.doc.idModel) {
        const idCountMaster = codeCModel.doc.idCM;
        const idModel = codeCModel.doc.idModel;
        const dle = await service.Create({
          code: "",
          idCountMaster,
          idModel,
        });
        const deleteModeratorModel = await new ModeratorsModelsService().Create(
          {
            idModel,
            idModerator: aSa._id,
          }
        );
        if (dle === null || deleteModeratorModel === null)
          return {
            response: "Error to Dissolved Association",
            status: HTTP_RESPONSE.ACCEPTED,
          };
      } else {
        return ErrorReturn(
          "Count Master Models",
          "Error to Create Relation in doc"
        );
      }
    } else {
      return ErrorReturn(
        "Count Master Models",
        "Error to Create Relation in doc not exist"
      );
    }

    if (codeCModel.hInit === "count-master") {
      //TODO: Email Informar Aceptacion a la cuenta master de la modelo
    } else if (codeCModel.hInit === "model") {
      //TODO: Email Informar Aceptacion a la cuenta modelo de la cuenta master
    }
    return {
      response: "Error to Dissolved Association",
      status: HTTP_RESPONSE.ACCEPTED,
    };
  }

  @HttpMethods()
  async deleteUnsubscribe({
    params,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idModel, idCM } = params;
    const { idUser, type } = body;

    if (
      type === undefined ||
      type === null ||
      idUser === undefined ||
      idUser !== null
    ) {
      return ErrorReturn(
        "CountMaster-Models",
        "id of User and Type is required"
      );
    }

    const model = await VerifyIDOFUser(idModel, "model");
    if (model !== null) {
      return model;
    }

    const countmaster = await VerifyIDOFUser(idCM, "count-master");
    if (countmaster !== null) {
      return countmaster;
    }

    const service = new CountMasterModelsService();
    const mms = await service.Find({ idCM, idModel }, { limit: 1, page: 1 });
    if (mms === null) {
      return ErrorReturn(
        "CountMaster-Models",
        "There is no association with these ids"
      );
    }
    if (mms.docs) {
      if (mms.docs.length < 0) {
        return ErrorReturn(
          "CountMaster-Models",
          "There is no association with these ids"
        );
      }
    }
    const deletingService = new CountMasterModelsDeletingService();
    let code = "";

    if (type !== ROLES.ADMIN) {
      const unsubscribe = await service.Delete(mms.docs[0]._id);
      if (unsubscribe === null) {
        return ErrorReturn("Subscribe", "Error deleting");
      } else {
        return ErrorReturn("Subscribe", "Partnership terminated");
      }
    } else if (type !== ROLES.MODEL) {
      const userModel = await new ModelService().FindById(idModel);
      if (userModel === null) {
        return ErrorReturn("CountMaster-Models", "Not Model whit this Id");
      }
      code = CodeGenerator(userModel._id);
      const ce = await deletingService.Create({
        code,
        hInit: "model",
        types: CODETYPE.MODEL,
        action: CODETYPEACTION.DELTING,
      });
      if (ce === null) {
        return ErrorReturn(
          "CountMaster-Models",
          "Error to Create Code Of Deleting"
        );
      }
      const tt = await service.Update({ idModel, idCM }, { code });
      if (tt === null) {
        return ErrorReturn(
          "CountMaster-Models",
          "Error to Update Code Of Realtion"
        );
      }
    } else if (type !== ROLES.COUNTMASTER) {
      const userCountMaster = await new CountMasterModelsService().FindById(
        idCM
      );
      if (userCountMaster === null) {
        return ErrorReturn(
          "CountMaster-Models",
          "Not Count Master whit this Id"
        );
      }
      code = CodeGenerator(userCountMaster._id);
      const ce = await deletingService.Create({
        code,
        hInit: "count-master",
        types: CODETYPE.COUNTMASTER,
        action: CODETYPEACTION.DELTING,
      });
      if (ce === null) {
        return ErrorReturn(
          "CountMaster-Models",
          "Error to Create Code Of Deleting"
        );
      }
      const tts = await service.Update({ idModel, idCM }, { code });
      if (tts === null) {
        return ErrorReturn(
          "CountMaster-Models",
          "Error to Update Code Of Realtion"
        );
      }
    }
    //TODO: Email enviar confirmacion segun El type
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "Email Send to Model For Accept Unsubscribe",
    };
  }

  @HttpMethods()
  async deleteUnsubscribeConfirm({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { code } = params;

    const codeCModel = (await new CodeService().FindByCode(
      code
    )) as ICode | null;
    if (codeCModel === null) {
      return {
        response: "Not Code of This CodeThere is no confirmation for this code",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    const service = new CountMasterModelsService();
    const mms = (await service.FindByCode(
      code
    )) as WID<ICountMasterModels> | null;
    if (mms === null) {
      return {
        response: "Not Associated whit this ids",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    if (codeCModel.action !== CODETYPEACTION.DELTING) {
      return {
        response: "The action is not delete",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    if (codeCModel.code !== mms.code) {
      return {
        response: "The code is not the same",
        status: HTTP_RESPONSE.ACCEPTED,
      };
    }

    const countMaster = new CountMasterService();
    const aSa = (await countMaster.FindById(
      mms.idCountMaster
    )) as WID<ICountMaster>;
    if (aSa === null) {
      return ErrorReturn("Count Master Models", "Error To Get Count Msster");
    }
    const moderatorModelsCountMaster = await new ModeratorsModelsService().Find(
      { idModel: mms.idModel, idModerator: aSa._id },
      { limit: 1, page: 1 }
    );

    if (moderatorModelsCountMaster === null) {
      return ErrorReturn("Count Master Models", "Error To Get Count Msster");
    }

    if (moderatorModelsCountMaster.docs) {
      if (moderatorModelsCountMaster.docs.length < 0) {
        return ErrorReturn(
          "Count Master Models",
          "Error to search Relation Model Moderator"
        );
      }
    }

    const deleteModeratorModel = await new ModeratorsModelsService().Delete(
      moderatorModelsCountMaster.docs[0]._id
    );

    const dle = await service.Delete(mms._id);
    if (dle === null || deleteModeratorModel === null)
      return {
        response: "Error to Dissolved Association",
        status: HTTP_RESPONSE.ACCEPTED,
      };

    if (codeCModel.hInit === "count-master") {
      //TODO: Email Informar Aceptacion a la cuenta master de la modelo
    } else if (codeCModel.hInit === "model") {
      //TODO: Email Informar Aceptacion a la cuenta modelo de la cuenta master
    }
    return {
      response: "Error to Dissolved Association",
      status: HTTP_RESPONSE.ACCEPTED,
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
      "Count-Master-controller",
      `Interceptor of ${path.toUpperCase()}`
    );
    next();
  }
}

export const countMasterModelsController: CountMasterModelsController =
  new CountMasterModelsController();
