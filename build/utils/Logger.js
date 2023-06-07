"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const ColorImplementation_1 = __importDefault(require("./ColorImplementation"));
class Logger {
    color;
    model;
    selectColor;
    completeModel;
    log = console.log;
    date;
    constructor(_color, _model) {
        this.color = _color;
        this.model = _model.toUpperCase();
        this.selectColor = ColorImplementation_1.default.getColor(this.color);
        this.date = new Date();
        this.completeModel = `${this.date.toLocaleDateString()} ${this.date.toLocaleTimeString()} SH [${this.model}]: `;
    }
    Log(message) {
        if (typeof message === "object" || typeof message === "function") {
            this.log(this.selectColor, message);
        }
        else {
            const completeMessage = `${this.completeModel}${message.toString()}`;
            this.log(this.selectColor, completeMessage);
        }
    }
    Error(message) {
        if (typeof message === "object" || typeof message === "function") {
            this.log(ColorImplementation_1.default.getError(), message);
        }
        else {
            const completeMessage = `${this.completeModel}${message.toString()}`;
            this.log(ColorImplementation_1.default.getError(), completeMessage);
        }
    }
    LogChild(context, message) {
        if (typeof message === "object" || typeof message === "function") {
            this.log(this.selectColor, message);
        }
        else {
            const completeMessage = `${this.completeModel}[${context.toUpperCase()}]: ${message.toString()}`;
            this.log(this.selectColor, completeMessage);
        }
    }
    ErrorChild(context, message) {
        if (typeof message === "object" || typeof message === "function") {
            this.log(ColorImplementation_1.default.getError(), message);
        }
        else {
            const completeMessage = `${this.completeModel}[${context.toUpperCase()}]: ${message.toString()}`;
            this.log(ColorImplementation_1.default.getError(), completeMessage);
        }
    }
}
exports.Logger = Logger;
