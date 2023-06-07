"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushInterceptor = exports.Interceptors = void 0;
const types_enum_1 = require("../types.enum");
const const_1 = require("../utils/const");
const Logger_1 = require("../utils/Logger");
const Interceptors = [];
exports.Interceptors = Interceptors;
const loggerF = new Logger_1.Logger(types_enum_1.EnumColorLogger.FgBlue, "Interceptor");
function pushInterceptor(urlEndpointPrincipal, func) {
    const newInterceptorExtends = {
        interceptor: (req, res, next) => {
            const path = (0, const_1.FILTER_URL)(req.path);
            if (path[0] !== urlEndpointPrincipal) {
                next();
            }
            else {
                loggerF.Log(`The ${path[0].toUpperCase()} Interceptor has been executed`);
                func(req, res, next, loggerF, path[0]);
            }
        },
        name: urlEndpointPrincipal,
    };
    const matches = Interceptors.filter((e) => e.name === urlEndpointPrincipal);
    if (matches.length > 0) {
        return;
    }
    Interceptors.push(newInterceptorExtends);
    new Logger_1.Logger(types_enum_1.EnumColorLogger.BgBlue, "Interceptor").Log(`Interceptor of ${urlEndpointPrincipal} Import Complete`);
}
exports.pushInterceptor = pushInterceptor;
