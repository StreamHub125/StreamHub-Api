import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Logger } from "./utils/Logger";
import { EnumColorLogger } from "./types.enum";
import { getUrlPath } from "./utils/const";
import { InterceptorExtends } from "./interfaces/IInterceptorExtends";
import { Interceptors } from "./controllers/Interceptors";
import { Controller } from "./abstract/Controller";
import IService from "./interfaces/IService";

const loggerApp: Logger = new Logger(EnumColorLogger.FgMagenta, "App");

export default class App {
  private readonly app = express();
  private readonly db_mongo = mongoose;

  interceptors: InterceptorExtends[] = [];

  constructor(
    private readonly URL_MONGO_CONNECTION: string,
    private readonly PORT: number,
    private readonly NAME_API: string
  ) {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(`${this.NAME_API}/public`, express.static("src/upload"));
    loggerApp.Log(`Get Files ${getUrlPath()}/public/**`);
    if (Interceptors.length > 0) {
      Interceptors.forEach((e) => {
        this.addInterceptor(e);
      });
    }

    this.executeInterceptor();
  }

  init(): void {
    // Init Mongo
    this.db_mongo
      .connect(this.URL_MONGO_CONNECTION)
      .then(() => loggerApp.Log("Connection to Mongo DB Successful"))
      .catch((e) => {
        loggerApp.Error("Connection to Mongo DB Unsuccessful");
        loggerApp.Error(e);
        //TODO: Enviar Email De Caida Base de datos tambien al personal
      });

    // Active Server
    this.app.listen(this.PORT, () => {
      loggerApp.Log(`Server in PORT = ${this.PORT}, API = ${this.NAME_API}`);
      loggerApp.Log(`ROUTE = ${getUrlPath()}`);
    });
  }

  description(description: string): void {
    loggerApp.LogChild("Description", description);
  }

  /**
   * Import to Controller in app
   * @param controller Type Controller
   * @param route Type Router Express
   * @returns Void
   */
  import(controller: Controller<any, IService<any>>, route: Router): void {
    let path = `${this.NAME_API}${controller.path}`;
    this.app.use(path, route);
    loggerApp.Log(path);
    loggerApp.Log(`Route of ${controller.path} Import Complete`);
  }

  addInterceptor(interceptor: InterceptorExtends): void {
    this.interceptors.push(interceptor);
  }

  private executeInterceptor(): void {
    if (this.interceptors.length > 0) {
      this.interceptors.forEach((e) => {
        this.app.use(e.interceptor);
        const nameInterceptor = e.name;
        loggerApp.Log("Interceptor of " + nameInterceptor + " is ACTIVE");
      });
    }
  }
}
