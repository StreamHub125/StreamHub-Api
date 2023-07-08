import NodeMediaServer from "node-media-server";
import { config } from "./config";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger } from "../../types.enum";
import { Config } from "../../types";

const nms = new NodeMediaServer(config as Config);
const loggerNMs = new Logger(EnumColorLogger.FgGreen, "NMS");

nms.on("prePublish", (_id, _StreamPath, _args) => {
  console.log(_id, _StreamPath, _args);
  loggerNMs.Log("Node Media Server");
});

export default nms;
