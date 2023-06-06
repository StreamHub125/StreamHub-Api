import { Request, Response } from "express";
import { Logger } from "./class/Logger";
import { HTTP_RESPONSE } from "./types.enum";

export type Interceptor = (req: Request, res: Response, next: Function) => void;

export type InterceptorMethod = (
  req: Request,
  res: Response,
  next: Function,
  interceptorLogger: Logger,
  path: string
) => void;

export interface ReturnMethod {
  status: HTTP_RESPONSE;
  response: Object | string | number;
}

export interface InputHttpMethodsArgument {
  body: any;
  params: any;
}

export interface InputHttpMethodsArgumentFile {
  body: any;
  params: any;
  file: any;
}

export interface InputHttpMethodsArgumentFiles {
  body: any;
  params: any;
  files: any;
}

export type InputHttpMethodsFile = Express.Multer.File;

export interface ENVIRONMENTSTYPES {
  URL_MONGO_CONNECTION: string;
  NAME_APPLICATION: string;
  VERSION_APPLICATION: number;
  DESCRIPTION_APPLICATION: string;
  PORT: number;
  URL_NAME: string;
  CLOUDINARY_CONFIG: CLOUDINARYCONFIG;
}

export interface CLOUDINARYCONFIG {
  CLOUD_NAME: string;
  API_KEY: string;
  API_SECRET: string;
}
