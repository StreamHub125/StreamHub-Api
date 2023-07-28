import {
  HasNextPaginate,
  PaginatedResult,
  PaginatedResultPrevNext,
} from "../interfaces/IDocumentsResponse";
import IService from "../interfaces/IService";
import AdminService from "../services/AdminService";
import ModelService from "../services/ModelService";
import ModeratorService from "../services/ModeratorService";
import ViewerService from "../services/ViewerService";
import {
  ENVIRONMENTSTYPES,
  ReturnMethod,
  SaveService,
  VerifyIdUser,
} from "../types";
import { HTTP_RESPONSE } from "../types.enum";
import settings from "./json/stettings.json";
import CloudinaryIm from "cloudinary";
import DontEnv from "dotenv";

DontEnv.config();

export const ENVIRONMENTS: ENVIRONMENTSTYPES = {
  URL_MONGO_CONNECTION: `mongodb+srv://${process.env.MONGODB_USERNAME || ""}:${
    process.env.MONGODB_PASSWORD || ""
  }@streamhubdb.s9m8vjd.mongodb.net/?retryWrites=true&w=majority`,
  NAME_APPLICATION: settings.name,
  VERSION_APPLICATION: settings.version,
  DESCRIPTION_APPLICATION: settings.description,
  PORT: settings.port,
  URL_NAME: process.env.URL_NAME || "localhost",
  CLOUDINARY_CONFIG: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUDNAME || "",
    API_KEY: process.env.CLOUDINARY_APIKEY || "",
    API_SECRET: process.env.CLOUDINARY_APISECRET || "",
  },
};

export const Claudinary = () => {
  CloudinaryIm.v2.config({
    cloud_name: ENVIRONMENTS.CLOUDINARY_CONFIG.CLOUD_NAME,
    api_key: ENVIRONMENTS.CLOUDINARY_CONFIG.API_KEY,
    api_secret: ENVIRONMENTS.CLOUDINARY_CONFIG.API_SECRET,
  });
  return CloudinaryIm.v2;
};

export const HOST = getUrlPath();

export function getUrlPath(): string {
  let version = `/api-v${ENVIRONMENTS.VERSION_APPLICATION}`;
  if (ENVIRONMENTS.URL_NAME === "localhost") {
    return `localhost:${ENVIRONMENTS.PORT}${version}`;
  } else {
    if (process.env.NEED_PORT === "true") {
      return `${ENVIRONMENTS.URL_NAME}:${ENVIRONMENTS.PORT}${version}`;
    } else {
      return `${ENVIRONMENTS.URL_NAME}${version}`;
    }
  }
}

export const FILTER_URL = (url: string): string[] => {
  const urlSplit = url.split("/");
  const array = [];
  for (let index = 0; index < urlSplit.length; index++) {
    if (urlSplit[index] !== "api-v1") {
      if (urlSplit[index] !== "") {
        if (urlSplit[index] !== " ") {
          array.push(urlSplit[index]);
        }
      }
    }
  }
  return array;
};

export const ERROR = (message: string | number | object): Object => {
  return {
    error: message,
  };
};

export async function VerifyID<T, Type extends IService<T>>(
  id: string,
  service: Type,
  type: string
): Promise<ReturnMethod | null> {
  const idObject = await service.FindById(id);
  if (idObject === null) {
    return {
      status: HTTP_RESPONSE.NO_ACCEPTABLE,
      response: `No ${type} with this id`,
    };
  }
  return null;
}

export const saveServiceDefault: SaveService = {
  asset_id: "***",
  public_id: "***",
  version: 0,
  version_id: "***",
  signature: "***",
  width: 0,
  height: 0,
  format: "***",
  resource_type: "***",
  created_at: "***",
  tags: [],
  bytes: 0,
  type: "***",
  etag: "***",
  placeholder: false,
  url: "***",
  secure_url: "***",
  folder: "***",
  original_filename: "***",
  api_key: "***",
};

export function ErrorReturn(type: string, message?: string): ReturnMethod {
  if (message !== undefined) {
    return {
      response: `Error creating ${type}`,
      status: HTTP_RESPONSE.ACCEPTED,
    };
  }
  return {
    response: `${message} ${type}`,
    status: HTTP_RESPONSE.ACCEPTED,
  };
}

export async function VerifyIDOFUser(
  id: string,
  service: VerifyIdUser
): Promise<ReturnMethod | null> {
  const listService = {
    admin: new AdminService(),
    model: new ModelService(),
    moderator: new ModeratorService(),
    viewer: new ViewerService(),
  };

  switch (service) {
    case "admin":
      return await VerifyID(id, listService.admin, "Admin");

    case "model":
      return await VerifyID(id, listService.model, "Model");

    case "moderator": //moderator
      return await VerifyID(id, listService.moderator, "Moderator");

    case "viewer":
      return await VerifyID(id, listService.viewer, "Viewer");

    default:
      return null;
  }
}

export function hasNextPaginate<T extends PaginatedResult<any>>(
  obj: T | null,
  path: string, //  /model/${id}
  url: string,
  limit: number,
  page: number
): HasNextPaginate<T> | null {
  const prevAndNext: PaginatedResultPrevNext = {
    nextUrlPage: "",
    prevUrlPage: "",
  };
  if (obj === null) {
    return null;
  }
  if (obj.docs.length === 0) return null;
  if (obj.hasPrevPage) {
    prevAndNext.nextUrlPage = `${getUrlPath()}${path}${url}?limit=${limit}&page=${
      page - 1
    }`;
  }

  if (obj.hasNextPage) {
    prevAndNext.prevUrlPage = `${getUrlPath()}${path}${url}?limit=${limit}&page=${
      page + 1
    }`;
  }

  return {
    ...obj,
    ...prevAndNext,
  };
}
