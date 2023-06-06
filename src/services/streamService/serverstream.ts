import NodeMediaServer from "node-media-server";
import { config } from "./config";
import { Logger } from "../../utils/Logger";
import { EnumColorLogger } from "../../types.enum";

const nms = new NodeMediaServer(config);
const loggerNMs: Logger = new Logger(EnumColorLogger.FgGreen, "NMS");

nms.on("prePublish", (_id: string, _StreamPath: string, _args: object) => {
  loggerNMs.Log("Node Media Server");
});

export default nms;
