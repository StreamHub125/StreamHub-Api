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

/* Typos Node Media Server */

interface Config {
  logType?: number;
  rtmp?: RtmpConfig;
  http?: HttpConfig;
  https?: SslConfig;
  trans?: TransConfig;
  relay?: RelayConfig;
  fission?: FissionConfig;
  auth?: AuthConfig;
}

interface RtmpConfig {
  port?: number;
  ssl?: SslConfig;
  chunk_size?: number;
  gop_cache?: boolean;
  ping?: number;
  ping_timeout?: number;
}

interface SslConfig {
  key: string;
  cert: string;
  port?: number;
}

interface HttpConfig {
  mediaroot: string;
  port?: number;
  allow_origin?: string;
}

interface AuthConfig {
  play?: boolean;
  publish?: boolean;
  secret?: string;
}

// api?: boolean;
// api_user?: string;
// api_pass?:string;

interface TransConfig {
  ffmpeg: string;
  tasks: TransTaskConfig[];
}

interface RelayConfig {
  tasks: RelayTaskConfig[];
  ffmpeg: string;
}

interface FissionConfig {
  ffmpeg: string;
  tasks: FissionTaskConfig[];
}

interface TransTaskConfig {
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

interface RelayTaskConfig {
  app: string;
  name?: string;
  mode: string;
  edge: string;
  rtsp_transport?: string;
  appendName?: boolean;
}

interface FissionTaskConfig {
  rule: string;
  model: FissionTaskModel[];
}

interface FissionTaskModel {
  ab: string;
  vb: string;
  vs: string;
  vf: string;
}
/* Finish Types Node Media Server */
