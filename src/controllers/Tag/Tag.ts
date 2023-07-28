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
import {
  ErrorReturn,
  VerifyIDOFUser,
  hasNextPaginate,
} from "../../utils/const";
import { ConvertObj } from "../../utils/ConvertObj";
import { keysOfIGender } from "../../interfaces/IGender";

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

  @HttpMethods()
  async getTags({
    query,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const service = new TagService();
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
  async getTagById({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const service = new TagService();
    const { id } = params;
    const gender = await service.FindById(id);

    if (gender === null) {
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: `Not Tag By This ID = ${id}`,
      };
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: gender,
    };
  }

  @HttpMethods()
  async postTag({
    params,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idAdmin } = params;

    const verifyAdmin = await VerifyIDOFUser(idAdmin, "admin");
    if (verifyAdmin !== null) return verifyAdmin;

    const verifyBody = ConvertObj(keysOfIGender, body) as ITag;

    if (Object.keys(verifyBody).length === 0) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response:
          "Data in body not is the type Tag type please Verify you request",
      };
    }

    if (!verifyBody.description || !verifyBody.name)
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: "Need All Properties",
      };

    const service = new TagService();
    const tagCreate = await service.Create(verifyBody);

    if (tagCreate === null) {
      return ErrorReturn("Tag");
    }

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: tagCreate,
    };
  }

  @HttpMethods()
  async putTagById({
    params,
    body,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idAdmin, id } = params;

    const verifyAdmin = await VerifyIDOFUser(idAdmin, "admin");
    if (verifyAdmin !== null) return verifyAdmin;
    const verifyBody = ConvertObj(keysOfIGender, body);

    if (Object.keys(verifyBody).length === 0) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response:
          "Data in body not is the type Tag type please Verify you request",
      };
    }

    const service = new TagService();
    const tagUpdate = await service.Update({ _id: id }, verifyBody);

    if (tagUpdate === null)
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: `Not Tag by this Id ${id}`,
      };

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: tagUpdate,
    };
  }

  @HttpMethods()
  async deleteTagById({
    params,
  }: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const { idAdmin, id } = params;

    const verifyAdmin = await VerifyIDOFUser(idAdmin, "admin");
    if (verifyAdmin !== null) return verifyAdmin;

    const service = new TagService();
    const tagUpdate = await service.Delete(id);

    if (tagUpdate === null)
      return {
        status: HTTP_RESPONSE.NO_CONTENT,
        response: `Not Tag by this Id ${id}`,
      };

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: tagUpdate,
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
