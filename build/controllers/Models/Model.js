"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelController = void 0;
const Controller_1 = require("../../abstract/Controller");
const types_enum_1 = require("../../types.enum");
const Logger_1 = require("../../utils/Logger");
const HttpMethods_1 = __importDefault(require("../../decorators/HttpMethods"));
const ModelService_1 = __importDefault(require("../../services/ModelService"));
class ModelController extends Controller_1.Controller {
    path = "/model";
    //Routes
    pathGetModels = "/";
    service;
    routesLog = [
        {
            type: types_enum_1.METHODS_HTTP.GET,
            plur: "",
            path: this.pathGetModels,
        },
    ];
    loggerController;
    constructor() {
        super();
        this.service = new ModelService_1.default();
        this.loggerController = new Logger_1.Logger(types_enum_1.EnumColorLogger.FgCyan, this.pathRemove());
        this.addInterceptor();
    }
    getModels(_input) {
        return {
            status: types_enum_1.HTTP_RESPONSE.ACCEPTED,
            response: "Recibido Daniel Campaz",
        };
    }
    Interceptor(_req, _res, next, interceptorLogger, path) {
        interceptorLogger.LogChild("Model-Controller", `Execute Interceptor of ${path.toUpperCase()}`);
        next();
    }
}
__decorate([
    (0, HttpMethods_1.default)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ModelController.prototype, "getModels", null);
exports.default = ModelController;
exports.modelController = new ModelController();
