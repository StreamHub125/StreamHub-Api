import { Request, Response } from "express";

export function HttpMethodsFile(sendPromise = true): Function {
  return function (
    _target: Object,
    _key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = function (req: Request, res: Response): void {
      if (sendPromise) {
        original({
          body: req.body,
          params: req.params,
          query: req.query,
          file: req.file,
        }).then((value: any) => {
          if (typeof value === "object") {
            if (Object.hasOwn(value, "status")) {
              if (Object.hasOwn(value, "response")) {
                if (
                  typeof value.response === "string" ||
                  typeof value.response === "number"
                ) {
                  res.status(value.status).send(value.response);
                } else {
                  res.status(value.status).json(value.response);
                }
              }
            }
          }
        });
      } else {
        const value = original({
          body: req.body,
          params: req.params,
          query: req.query,
          file: req.file,
        });
        if (typeof value === "object") {
          if (Object.hasOwn(value, "status")) {
            if (Object.hasOwn(value, "response")) {
              if (
                typeof value.response === "string" ||
                typeof value.response === "number"
              ) {
                res.status(value.status).send(value.response);
              } else {
                res.status(value.status).json(value.response);
              }
            }
          }
        }
      }
    };
  };
}

export function HttpMethodsFiles(sendPromise = true): Function {
  return function (
    _target: Object,
    _key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = function (req: Request, res: Response): void {
      if (sendPromise) {
        original({
          body: req.body,
          params: req.params,
          files: req.files,
          query: req.query,
        }).then((value: any) => {
          if (typeof value === "object") {
            if (Object.hasOwn(value, "status")) {
              if (Object.hasOwn(value, "response")) {
                if (
                  typeof value.response === "string" ||
                  typeof value.response === "number"
                ) {
                  res.status(value.status).send(value.response);
                } else {
                  res.status(value.status).json(value.response);
                }
              }
            }
          }
        });
      } else {
        const value = original({
          body: req.body,
          params: req.params,
          files: req.files,

          query: req.query,
        });
        if (typeof value === "object") {
          if (Object.hasOwn(value, "status")) {
            if (Object.hasOwn(value, "response")) {
              if (
                typeof value.response === "string" ||
                typeof value.response === "number"
              ) {
                res.status(value.status).send(value.response);
              } else {
                res.status(value.status).json(value.response);
              }
            }
          }
        }
      }
    };
  };
}
