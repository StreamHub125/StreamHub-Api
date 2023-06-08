import { EnumColorLogger } from "../types.enum";
import { Logger } from "./Logger";

export default class LoggerS {
  static logger: Logger = new Logger(EnumColorLogger.BgGray, "CONSOle");
  static Log(message: string | number | boolean | symbol | object): void {
    this.logger.Log(message);
  }
  static Error(message: string | number | boolean | symbol | object): void {
    this.logger.Error(message);
  }
}
