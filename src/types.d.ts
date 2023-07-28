import { Request, Response } from "express";
import { Logger } from "./class/Logger";
import { HTTP_RESPONSE, METHODS_HTTP } from "./types.enum";
import IImageService from "./interfaces/IImages";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export type Interceptor = (req: Request, res: Response, next: Function) => void;

export type InterceptorMethod = (
  req: Request,
  res: Response,
  next: Function,
  interceptorLogger: Logger,
  path: string
) => void | Promise<void>;

export interface ReturnMethod {
  status: HTTP_RESPONSE;
  response: Object | string | number | null;
}

export type SendEmailInfoReturn = SMTPTransport.SentMessageInfo;
/**
     * SendEmailInfoReturn MuckUp
     * SendEmailInfoReturn: {
            accepted: [ '1321@111.com', 'clanclskn@gcac.com' ],
            rejected: [],
            ehlo: [
            'SIZE 35882577',
            '8BITMIME',
            'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
            'ENHANCEDSTATUSCODES',
            'PIPELINING',
            'CHUNKING',
            'SMTPUTF8'
            ],
            envelopeTime: 536,
            messageTime: 682,
            messageSize: 407,
            response: '250 2.0.0 OK  1690517236 x6-20020a05610223c600b004451f8ccf1csm418782vsr.11 - gsmtp',
            envelope: { from: 'streamhub.con.fn@gmail.com', to: [Array] },
            messageId: '<5a52b10e-9388-dcc1-055e-f9e26b10a57c@gmail.com>'
        }
     */

export type MulterImage = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  cloudinary?: any;
};

export type CloudinaryResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: Array<String>;
  bytes: number;
  type: string;
  etag: string;
  placeholder: false;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  api_key: string;
};

export type DeleteImageProps = {
  ids: Array<string>;
  type: string;
  resource_type: string;
};

export type SaveService = CloudinaryResponse;

export interface InputHttpMethodsArgument {
  body: any;
  params: any;
  query: any;
}

export interface InputHttpMethodsArgumentFile {
  body: any;
  params: any;
  query: any;
  file: MulterImage;
}

export interface InputHttpMethodsArgumentFiles {
  body: any;
  params: any;
  query: any;
  files: MulterImage[];
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
  plur: string | null;
  path: string;
  plrs: boolean;
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

export type VerifyIdUser =
  | "admin"
  | "model"
  | "moderator"
  | "viewer"
  | "count-master";

export type WID<T> = T & {
  _id: string;
};
