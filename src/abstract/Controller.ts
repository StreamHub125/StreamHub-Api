import { Request, Response } from "express";
import { pushInterceptor } from "../controllers/Interceptors";
import { ILoggerChild } from "../interfaces/ILoggerChild";
import { Logger } from "../utils/Logger";
import { getUrlPath } from "../utils/const";
import IService from "../interfaces/IService";
import { ROUTESLOG } from "../types";

export abstract class Controller<IType, TypeService extends IService<IType>> {
  abstract readonly path: string;
  abstract routesLog: Array<ROUTESLOG>;
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
      let plur = e.plur === null ? "" : ` ${e.plur}`;
      let PathPl = e.plrs ? `${path}'s` : path;
      this.loggerController.Log(
        `${e.type.toUpperCase()} ${PathPl}${plur}: ${getUrlPath()}${this.path}${
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
