import { Request, Response } from "express";
import { Logger } from "./class/Logger";
import { HTTP_RESPONSE, METHODS_HTTP } from "./types.enum";

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

export interface ROUTESLOG {
  type: METHODS_HTTP;
  plur: string;
  path: string;
}

/* Typos Node Media Server */

export interface Config {
  logType?: number;
  rtmp?: RtmpConfig;
  http?: HttpConfig;
  https?: SslConfig;
  trans?: TransConfig;
  relay?: RelayConfig;
  fission?: FissionConfig;
  auth?: AuthConfig;
}

export interface RtmpConfig {
  port?: number;
  ssl?: SslConfig;
  chunk_size?: number;
  gop_cache?: boolean;
  ping?: number;
  ping_timeout?: number;
}

export interface SslConfig {
  key: string;
  cert: string;
  port?: number;
}

export interface HttpConfig {
  mediaroot: string;
  port?: number;
  allow_origin?: string;
}

export interface AuthConfig {
  play?: boolean;
  publish?: boolean;
  secret?: string;
}

// api?: boolean;
// api_user?: string;
// api_pass?:string;

export interface TransConfig {
  ffmpeg: string;
  tasks: TransTaskConfig[];
}

export interface RelayConfig {
  tasks: RelayTaskConfig[];
  ffmpeg: string;
}

export interface FissionConfig {
  ffmpeg: string;
  tasks: FissionTaskConfig[];
}

export interface TransTaskConfig {
  app: string;
  hls?: boolean;
  hlsFlags?: string;
  dash?: boolean;
  dashFlags?: string;
  vc?: string;
  vcParam?: string[];
  ac?: string;
  acParam?: string[];
  rtmp?: boolean;
  rtmpApp?: string;
  mp4?: boolean;
  mp4Flags?: string;
}

export interface RelayTaskConfig {
  app: string;
  name?: string;
  mode: string;
  edge: string;
  rtsp_transport?: string;
  appendName?: boolean;
}

export interface FissionTaskConfig {
  rule: string;
  model: FissionTaskModel[];
}

export interface FissionTaskModel {
  ab: string;
  vb: string;
  vs: string;
  vf: string;
}
/* Finish Types Node Media Server */
