"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR = exports.FILTER_URL = exports.getUrlPath = exports.HOST = exports.Claudinary = exports.ENVIRONMENTS = void 0;
const stettings_json_1 = __importDefault(require("./json/stettings.json"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENVIRONMENTS = {
    URL_MONGO_CONNECTION: `mongodb+srv://${process.env.MONGODB_USERNAME || ""}:${process.env.MONGODB_PASSWORD || ""}@streamhubdb.s9m8vjd.mongodb.net/?retryWrites=true&w=majority`,
    NAME_APPLICATION: stettings_json_1.default.name,
    VERSION_APPLICATION: stettings_json_1.default.version,
    DESCRIPTION_APPLICATION: stettings_json_1.default.description,
    PORT: stettings_json_1.default.port,
    URL_NAME: process.env.URL_NAME || "localhost",
    CLOUDINARY_CONFIG: {
        CLOUD_NAME: process.env.CLOUDINARY_CLOUDNAME || "",
        API_KEY: process.env.CLOUDINARY_APIKEY || "",
        API_SECRET: process.env.CLOUDINARY_APISECRET || "",
    },
};
const Claudinary = () => {
    cloudinary_1.default.v2.config({
        cloud_name: exports.ENVIRONMENTS.CLOUDINARY_CONFIG.CLOUD_NAME,
        api_key: exports.ENVIRONMENTS.CLOUDINARY_CONFIG.API_KEY,
        api_secret: exports.ENVIRONMENTS.CLOUDINARY_CONFIG.API_SECRET,
    });
    return cloudinary_1.default.v2;
};
exports.Claudinary = Claudinary;
exports.HOST = getUrlPath();
function getUrlPath() {
    let version = `/api-v${exports.ENVIRONMENTS.VERSION_APPLICATION}`;
    if (exports.ENVIRONMENTS.URL_NAME === "localhost") {
        return `localhost:${exports.ENVIRONMENTS.PORT}${version}`;
    }
    else {
        return `${exports.ENVIRONMENTS.URL_NAME}${version}`;
    }
}
exports.getUrlPath = getUrlPath;
const FILTER_URL = (url) => {
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
exports.FILTER_URL = FILTER_URL;
const ERROR = (message) => {
    return {
        error: message,
    };
};
exports.ERROR = ERROR;
