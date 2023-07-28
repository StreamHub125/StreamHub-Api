import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { IGender, keysOfIGender } from "../../interfaces/IGender";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import GenderService from "../../services/GenderService";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";
import { ErrorReturn, VerifyID, hasNextPaginate } from "../../utils/const";
import AdminService from "../../services/AdminService";
import { ConvertObj } from "../../utils/ConvertObj";

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
      plur: "GET all Gender ",
    },
    {
      type: METHODS_HTTP.GET,
      path: this.pathGetGenderById,
      plrs: false,
      plur: "GET Gender by Id",
    },
    {
      type: METHODS_HTTP.POST,
      path: this.pathPostGender,
      plrs: false,
      plur: "POST Need a Admin Id for Create a Gender",
    },
    {
      type: METHODS_HTTP.PUT,
      path: this.pathPutGenderById,
      plrs: false,
      plur: "PUT Need a Admin Id for Update a Gender and id of Gender to Updating",
    },
    {
      type: METHODS_HTTP.DELETE,
      path: this.pathDeleteGenderById,
      plrs: false,
      plur: "DELETE Need a Admin Id for Delete a Gender and id of Gender to Deleting",
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

  @HttpMethods()
  async getGenders({
    body,
    query,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const service = new GenderService();
    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const pathComplete = body.pathComplete;
    const genders = await service.Find(
      {},
      {
        limit,
        page,
      }
    );

    const genderHNHA = hasNextPaginate(genders, pathComplete, "/", limit, page);

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: genderHNHA,
    };
  }

  @HttpMethods()
  async getGenderById({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const service = new GenderService();
    const { id } = params;
    const gender = await service.FindById(id);

    if (gender === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: `Not Gender By This ID = ${id}`,
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: gender,
    };
  }

  @HttpMethods()
  async postGender({
    params,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idAdmin } = params;

    const verifyAdmin = await VerifyID(idAdmin, new AdminService(), "Admin");
    if (verifyAdmin !== null) return verifyAdmin;

    const verifyBody = ConvertObj(keysOfIGender, body);

    if (Object.keys(verifyBody).length === 0) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response:
          "Data in body not is the type Gender type please Verify you request",
      };
    }

    const service = new GenderService();
    const genderCreate = await service.Create(verifyBody as IGender);

    if (genderCreate === null) {
      return ErrorReturn("Gender");
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: genderCreate,
    };
  }

  @HttpMethods()
  async putGenderById({
    params,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idAdmin, id } = params;

    const verifyAdmin = await VerifyID(idAdmin, new AdminService(), "Admin");
    if (verifyAdmin !== null) return verifyAdmin;
    const verifyBody = ConvertObj(keysOfIGender, body);

    if (Object.keys(verifyBody).length === 0) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response:
          "Data in body not is the type Gender type please Verify you request",
      };
    }

    const service = new GenderService();
    const genderUpdate = await service.Update({ _id: id }, verifyBody);

    if (genderUpdate === null)
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: `Not Gender by this Id ${id}`,
      };

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: genderUpdate,
    };
  }

  @HttpMethods()
  async deleteGenderById({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idAdmin, id } = params;

    const verifyAdmin = await VerifyID(idAdmin, new AdminService(), "Admin");
    if (verifyAdmin !== null) return verifyAdmin;

    const service = new GenderService();
    const genderUpdate = await service.Delete(id);

    if (genderUpdate === null)
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: `Not Gender by this Id ${id}`,
      };

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: genderUpdate,
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
