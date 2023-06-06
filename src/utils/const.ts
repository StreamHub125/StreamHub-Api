import { ENVIRONMENTSTYPES } from "../types";
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
    return `${ENVIRONMENTS.URL_NAME}${version}`;
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
