"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethodsFiles = exports.HttpMethodsFile = void 0;
function HttpMethodsFile(sendPromise) {
    return function (_target, _key, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (req, res) {
            if (sendPromise) {
                original({
                    body: req.body,
                    params: req.params,
                    file: req.file
                }).then((value) => {
                    if (typeof value === 'object') {
                        if (Object.hasOwn(value, 'status')) {
                            if (Object.hasOwn(value, 'response')) {
                                if (typeof value.response === 'string' || typeof value.response === 'number') {
                                    res.status(value.status).send(value.response);
                                }
                                else {
                                    res.status(value.status).json(value.response);
                                }
                            }
                        }
                    }
                });
            }
            else {
                const value = original({
                    body: req.body,
                    params: req.params,
                    file: req.file
                });
                if (typeof value === 'object') {
                    if (Object.hasOwn(value, 'status')) {
                        if (Object.hasOwn(value, 'response')) {
                            if (typeof value.response === 'string' || typeof value.response === 'number') {
                                res.status(value.status).send(value.response);
                            }
                            else {
                                res.status(value.status).json(value.response);
                            }
                        }
                    }
                }
            }
        };
    };
}
exports.HttpMethodsFile = HttpMethodsFile;
function HttpMethodsFiles(sendPromise) {
    return function (_target, _key, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (req, res) {
            if (sendPromise) {
                original({
                    body: req.body,
                    params: req.params,
                    files: req.files
                }).then((value) => {
                    if (typeof value === 'object') {
                        if (Object.hasOwn(value, 'status')) {
                            if (Object.hasOwn(value, 'response')) {
                                if (typeof value.response === 'string' || typeof value.response === 'number') {
                                    res.status(value.status).send(value.response);
                                }
                                else {
                                    res.status(value.status).json(value.response);
                                }
                            }
                        }
                    }
                });
            }
            else {
                const value = original({
                    body: req.body,
                    params: req.params,
                    files: req.files
                });
                if (typeof value === 'object') {
                    if (Object.hasOwn(value, 'status')) {
                        if (Object.hasOwn(value, 'response')) {
                            if (typeof value.response === 'string' || typeof value.response === 'number') {
                                res.status(value.status).send(value.response);
                            }
                            else {
                                res.status(value.status).json(value.response);
                            }
                        }
                    }
                }
            }
        };
    };
}
exports.HttpMethodsFiles = HttpMethodsFiles;
