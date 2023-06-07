"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_media_server_1 = __importDefault(require("node-media-server"));
const config_1 = require("./config");
const Logger_1 = require("../../utils/Logger");
const types_enum_1 = require("../../types.enum");
const nms = new node_media_server_1.default(config_1.config);
const loggerNMs = new Logger_1.Logger(types_enum_1.EnumColorLogger.FgGreen, "NMS");
nms.on("prePublish", (_id, _StreamPath, _args) => {
    loggerNMs.Log("Node Media Server");
});
exports.default = nms;
