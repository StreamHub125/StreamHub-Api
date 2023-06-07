"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const Model_1 = require("./controllers/Models/Model");
const ModelRouter_1 = __importDefault(require("./controllers/Models/ModelRouter"));
const serverstream_1 = __importDefault(require("./services/streamService/serverstream"));
const const_1 = require("./utils/const");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, const_1.Claudinary)();
const app = new app_1.default(const_1.ENVIRONMENTS.URL_MONGO_CONNECTION, const_1.ENVIRONMENTS.PORT, `/api-v${const_1.ENVIRONMENTS.VERSION_APPLICATION}`);
app.description(const_1.ENVIRONMENTS.DESCRIPTION_APPLICATION);
app.import(Model_1.modelController, ModelRouter_1.default);
app.init();
serverstream_1.default.run();
