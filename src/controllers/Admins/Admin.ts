import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { IAdmin } from "../../interfaces/IAdmin";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import AdminService from "../../services/AdminService";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";

export default class AdminController extends Controller<IAdmin, AdminService> {
  public readonly path: string = "/admin";

  //Routes
  /* GETS */
  public readonly pathGetAdmins: string = "/:idAdmin";
  public readonly pathGetAdminById: string = "/:idAdmin/:idGet";

  /* POSTS */
  public readonly pathPostAdmin: string = "/:idAdmin";

  /* PUTS */
  public readonly pathPutAdminById: string = "/:idAdmin/:idPut";

  /* DELETES */
  public readonly pathDeleteAdminById: string = "/:idAdmin/:idDelete";

  //Finish Routes

  /* Optener todos loas admis, Optener por Id, Crear Update, Delete */

  routesLog: ROUTESLOG[] = [
    {
      path: this.pathGetAdmins,
      plur: "Need a Admin Id for GET all Admins",
      plrs: true,
      type: METHODS_HTTP.GET,
    },
    {
      path: this.pathGetAdminById,
      plur: "Need a Admin Id for GET Admin",
      plrs: false,
      type: METHODS_HTTP.GET,
    },
    {
      path: this.pathPostAdmin,
      plur: "Need a Admin Id for Create a new Admin",
      plrs: false,
      type: METHODS_HTTP.POST,
    },
    {
      path: this.pathPutAdminById,
      plur: "Need a Admin Id for Update a Admin and Id of the Admin to Update",
      plrs: false,
      type: METHODS_HTTP.PUT,
    },
    {
      path: this.pathDeleteAdminById,
      plur: "Need a Admin Id for Delete a Admin and Id of the Admin to Delete",
      plrs: false,
      type: METHODS_HTTP.DELETE,
    },
  ];
  loggerController: Logger;
  service: AdminService;

  constructor() {
    super();
    this.loggerController = new Logger(
      EnumColorLogger.FgGreen,
      this.pathRemove()
    );
    this.service = new AdminService();
    this.addInterceptor();
  }

  @HttpMethods(false)
  getAdmins(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  getAdminById(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  postAdmin(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  putAdminById(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  @HttpMethods(false)
  deleteAdminById(_input: InputHttpMethodsArgument): ReturnMethod {
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: "",
    };
  }

  async Interceptor(
    _req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    _res: Response<any, Record<string, any>>,
    next: Function,
    interceptorLogger: ILoggerChild,
    path: string
  ): Promise<void> {
    interceptorLogger.LogChild(
      "Admin-Controller",
      `Execute Interceptor of ${path.toUpperCase()}`
    );

    // const { idAdmin } = req.params;

    // const adminServiceInterceptor = new AdminService();

    // const admin = await adminServiceInterceptor.FindById(idAdmin);

    // if (admin === null) res.json(`Not Exist a Admin with id = ${idAdmin}`);

    // if (admin?.permissions !== 0) {
    //   res.json(
    //     `This administrator named ${admin?.name} ${admin?.lastname} does not have permission for this operation`
    //   );
    // } else {
    //   next();
    // }

    next();
  }
}

export const adminController: AdminController = new AdminController();
