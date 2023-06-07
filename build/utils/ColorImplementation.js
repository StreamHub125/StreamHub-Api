"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_enum_1 = require("../types.enum");
class ColorImplementation {
    name = '';
    static colorDefault = types_enum_1.EnumColorLogger.Reset;
    static getColor(color) {
        const keysEnumColorLogger = Object.values(types_enum_1.EnumColorLogger);
        const colorSelect = keysEnumColorLogger.filter((v) => v === color);
        const ColorSelect = colorSelect[0];
        return `${ColorSelect}%s${this.colorDefault}`;
    }
    static getError() {
        return `${types_enum_1.EnumColorLogger.FgRed}%s${types_enum_1.EnumColorLogger.Reset}`;
    }
}
exports.default = ColorImplementation;
