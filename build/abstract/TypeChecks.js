"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeChecks {
    TypeChecks = true;
    static sendError(message, status) {
        return {
            error: message,
            status
        };
    }
}
exports.default = TypeChecks;
