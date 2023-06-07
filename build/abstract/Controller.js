"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const Interceptors_1 = require("../controllers/Interceptors");
const const_1 = require("../utils/const");
class Controller {
    logRoutes() {
        const path = this.pathRemove();
        this.loggerController.Log(`${path} Routes: `);
        this.routesLog.forEach((e) => {
            this.loggerController.Log(`${e.type.toUpperCase()} ${path}${e.plur}: ${(0, const_1.getUrlPath)()}${this.path}${e.path}`);
        });
        this.loggerController.Log(`Finish ${path} Routes: `);
    }
    pathRemove() {
        const pathh = this.path;
        const fpath = pathh.slice(1).charAt(0).toUpperCase();
        return `${fpath}${pathh.slice(1).slice(1)}`;
    }
    addInterceptor() {
        this.logRoutes();
        const PATH = this.path.split("/")[1];
        (0, Interceptors_1.pushInterceptor)(PATH, this.Interceptor);
    }
}
exports.Controller = Controller;
