import { Request, Response } from "express";
import { pushInterceptor } from "../controllers/Interceptors";
import { ILoggerChild } from "../interfaces/ILoggerChild";
import { Logger } from "../utils/Logger";
import { getUrlPath } from "../utils/const";
import { METHODS_HTTP } from "../types.enum";
import IService from "../interfaces/IService";

export abstract class Controller<IType, TypeService extends IService<IType>> {
  abstract readonly path: string;
  abstract routesLog: Array<{ type: METHODS_HTTP; plur: string; path: string }>;
  abstract loggerController: Logger;
  abstract service: TypeService;

  abstract Interceptor(
    req: Request,
    _res: Response,
    next: Function,
    interceptorLogger: ILoggerChild,
    path: string
  ): void;

  logRoutes(): void {
    const path = this.pathRemove();
    this.loggerController.Log(`${path} Routes: `);
    this.routesLog.forEach((e) => {
      this.loggerController.Log(
        `${e.type.toUpperCase()} ${path}${e.plur}: ${getUrlPath()}${this.path}${
          e.path
        }`
      );
    });
    this.loggerController.Log(`Finish ${path} Routes: `);
  }

  pathRemove(): string {
    const pathh = this.path;
    const fpath = pathh.slice(1).charAt(0).toUpperCase();
    return `${fpath}${pathh.slice(1).slice(1)}`;
  }

  addInterceptor(): void {
    this.logRoutes();
    const PATH = this.path.split("/")[1];
    pushInterceptor(PATH, this.Interceptor);
  }
}
