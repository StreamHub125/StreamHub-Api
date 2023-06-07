"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const Logger_1 = require("./utils/Logger");
const types_enum_1 = require("./types.enum");
const const_1 = require("./utils/const");
const Interceptors_1 = require("./controllers/Interceptors");
const loggerApp = new Logger_1.Logger(types_enum_1.EnumColorLogger.FgMagenta, "App");
class App {
    URL_MONGO_CONNECTION;
    PORT;
    NAME_API;
    app = (0, express_1.default)();
    db_mongo = mongoose_1.default;
    interceptors = [];
    constructor(URL_MONGO_CONNECTION, PORT, NAME_API) {
        this.URL_MONGO_CONNECTION = URL_MONGO_CONNECTION;
        this.PORT = PORT;
        this.NAME_API = NAME_API;
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(`${this.NAME_API}/public`, express_1.default.static("src/upload"));
        loggerApp.Log(`Get Files ${(0, const_1.getUrlPath)()}/public/**`);
        if (Interceptors_1.Interceptors.length > 0) {
            Interceptors_1.Interceptors.forEach((e) => {
                this.addInterceptor(e);
            });
        }
        this.executeInterceptor();
    }
    init() {
        // Init Mongo
        this.db_mongo
            .connect(this.URL_MONGO_CONNECTION)
            .then(() => loggerApp.Log("Connection to Mongo DB Successful"))
            .catch((e) => {
            loggerApp.Error("Connection to Mongo DB Unsuccessful");
            loggerApp.Error(e);
        });
        // Active Server
        this.app.listen(this.PORT, () => {
            loggerApp.Log(`Server in PORT = ${this.PORT}, api = ${this.NAME_API}`);
            loggerApp.Log(`Route = ${(0, const_1.getUrlPath)()}`);
        });
    }
    description(description) {
        loggerApp.LogChild("Description", description);
    }
    /*
     * Function to Import to Server Routes
     * @param name: String
     * @param route: Route
     * @Return void
     */
    import(controller, route) {
        let path = `${this.NAME_API}${controller.path}`;
        this.app.use(path, route);
        loggerApp.Log(path);
        loggerApp.Log(`Route of ${controller.path} Import Complete`);
    }
    addInterceptor(interceptor) {
        this.interceptors.push(interceptor);
    }
    executeInterceptor() {
        if (this.interceptors.length > 0) {
            this.interceptors.forEach((e) => {
                this.app.use(e.interceptor);
                const nameInterceptor = e.name;
                loggerApp.Log("Interceptor of " + nameInterceptor + " is ACTIVE");
            });
        }
    }
}
exports.default = App;
