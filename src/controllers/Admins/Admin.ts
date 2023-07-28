import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../abstract/Controller";
import { AdminDefault, IAdmin, keysOfAdmin } from "../../interfaces/IAdmin";
import { ILoggerChild } from "../../interfaces/ILoggerChild";
import AdminService from "../../services/AdminService";
import { InputHttpMethodsArgument, ROUTESLOG, ReturnMethod } from "../../types";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger, HTTP_RESPONSE, METHODS_HTTP } from "../../types.enum";
import HttpMethods from "../../decorators/HttpMethods";
import { ConvertObj } from "../../utils/ConvertObj";
import md5 from "md5";
import { ErrorReturn, VerifyID, hasNextPaginate } from "../../utils/const";

export default class AdminController extends Controller<IAdmin, AdminService> {
  public readonly path: string = "/admin";

  //Routes
  /* GETS */
  public readonly pathGetAdmins: string = "/:idAdmin";
  public readonly pathGetAdminById: string = "/:idAdmin/:idGet";

  /* POSTS */
  public readonly pathPostAdmin: string = "/:idAdmin";

  /* PUTS */
  public readonly pathPutAdminById: string = "/update/:idAdmin/:idPut";

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

  @HttpMethods()
  async getAdmins(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const service = new AdminService();
    const { idAdmin } = input.params;
    const limit = parseInt(input.query.limit) || 10;
    const page = parseInt(input.query.page) || 1;
    const adminVerify = await VerifyID(idAdmin, service, "Admin");
    if (adminVerify !== null) return adminVerify;
    const querr = ConvertObj(keysOfAdmin, input.body);
    const { pathComplete } = input.body;
    const admins = await service.Find(querr, {
      limit,
      page,
    });

    const adminWhitPageinate = hasNextPaginate(
      admins,
      pathComplete,
      `/${idAdmin}`,
      limit,
      page
    );

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: adminWhitPageinate,
    };
  }

  @HttpMethods()
  async getAdminById(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const service = new AdminService();
    const { idAdmin, idGet } = input.params;
    const adminVerify = await VerifyID(idAdmin, service, "Admin");
    if (adminVerify) return adminVerify;

    const admin = await service.FindById(idGet);

    if (admin === null)
      return {
        status: HTTP_RESPONSE.FORBIDDEN,
        response: `Admin whit id = ${idGet} not exist`,
      };

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: admin,
    };
  }

  @HttpMethods()
  async postAdmin(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const service = new AdminService();
    const { idAdmin } = input.params;
    const adminVerify = await VerifyID(idAdmin, service, "Admin");
    if (adminVerify !== null) return adminVerify;
    const { body } = input;

    const admin = ConvertObj(keysOfAdmin, body) as Partial<IAdmin>;
    if (Object.keys(admin).length === 0) {
      return {
        status: HTTP_RESPONSE.NO_ACCEPTABLE,
        response: "The Object Is Empty",
      };
    }

    if (admin.email) {
      if (admin.email) {
        if (!admin.email.includes("streamhub")) {
          return {
            status: HTTP_RESPONSE.NO_ACCEPTABLE,
            response: "Email Not Validate",
          };
        }
      }
    }
    const password = admin.password ? admin.password : "";

    const adminComplete: IAdmin = {
      ...AdminDefault,
      ...admin,
      password: md5(password),
    };

    const adminCreate = await service.Create(adminComplete);
    if (adminCreate === null) {
      return ErrorReturn("Admin");
    }
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: adminCreate,
    };
  }

  // @HttpMethods(true)
  // async putAdminById(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
  //   const service = new AdminService();
  //   const filterVerification = ConvertObj(keysOfAdmin, input.body.filter);
  //   const updateVerification = ConvertObj(keysOfAdmin, input.body.update);
  //   const admin = await service.Updates(filterVerification, updateVerification);
  //   if (admin === null) {
  //     return {
  //       status: HTTP_RESPONSE.ACCEPTED,
  //       response: "No Admin whith this Filter",
  //     };
  //   }
  //   return {
  //     status: HTTP_RESPONSE.ACCEPTED,
  //     response: admin,
  //   };
  // }

  @HttpMethods()
  async putAdminById(input: InputHttpMethodsArgument): Promise<ReturnMethod> {
    const service = new AdminService();
    const { idAdmin, idPut } = input.params;
    const adminVerify = await VerifyID(idAdmin, service, "Admin");
    if (adminVerify) return adminVerify;

    const newAdminUpdate = ConvertObj(
      keysOfAdmin,
      input.body
    ) as Partial<IAdmin>;

    if (newAdminUpdate.password) {
      newAdminUpdate.password = md5(newAdminUpdate.password);
    }

    await service.Update({ _id: idPut }, newAdminUpdate);

    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: await service.FindById(idPut),
    };
  }

  @HttpMethods()
  async deleteAdminById(
    input: InputHttpMethodsArgument
  ): Promise<ReturnMethod> {
    const service = new AdminService();
    const { idAdmin, idDelete } = input.params;
    const adminVerify = await VerifyID(idAdmin, service, "Admin");
    if (adminVerify) return adminVerify;
    const adminRemove = await service.Delete(idDelete);
    return {
      status: HTTP_RESPONSE.ACCEPTED,
      response: adminRemove,
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
    next();
  }
}

export const adminController: AdminController = new AdminController();
