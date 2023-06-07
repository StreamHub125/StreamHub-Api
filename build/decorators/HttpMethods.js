"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HttpMethods(sendPromise) {
    return function (_target, _key, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (req, res) {
            if (sendPromise) {
                original({
                    body: req.body,
                    params: req.params
                }).then((valueWP) => {
                    if (typeof valueWP === 'object') {
                        if (Object.hasOwn(valueWP, 'status')) {
                            if (Object.hasOwn(valueWP, 'response')) {
                                if (typeof valueWP.response === 'string' || typeof valueWP.response === 'number') {
                                    res.status(valueWP.status).send(valueWP.response);
                                }
                                else {
                                    res.status(valueWP.status).json(valueWP.response);
                                }
                            }
                        }
                    }
                });
            }
            else {
                const valueWOP = original({
                    body: req.body,
                    params: req.params
                });
                if (typeof valueWOP === 'object') {
                    if (Object.hasOwn(valueWOP, 'status')) {
                        if (Object.hasOwn(valueWOP, 'response')) {
                            if (typeof valueWOP.response === 'string' || typeof valueWOP.response === 'number') {
                                res.status(valueWOP.status).send(valueWOP.response);
                            }
                            else {
                                res.status(valueWOP.status).json(valueWOP.response);
                            }
                        }
                    }
                }
            }
        };
    };
}
exports.default = HttpMethods;
