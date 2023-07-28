import { Document } from "mongoose";
import {
  AvatarType,
  IUserSchemaWAvatar,
  IUserWAvatar,
  UserWAvatarDefault,
  keysOfIUserWAvatar,
} from "./IUser";

export interface IModel extends IUserWAvatar {
  isVerificate: boolean;
  verificatePhoto?: AvatarType;
  gender: string;
  tag: string[];
  secret_key: string;
}

export interface IModelM extends Omit<IModel, "fn"> {}
export interface IModelModel extends Document, IModelM {}

export const IModelSchema = {
  ...IUserSchemaWAvatar,
  isVerificate: {
    type: Boolean,
    default: false,
  },
  verificatePhoto: {
    type: {
      public_id: {
        type: String,
        required: false,
        default: "",
      },
      secure_url: {
        type: String,
        required: false,
        default: "",
      },
      url: {
        type: String,
        required: false,
        default: "",
      },
      cl_type: {
        type: String,
        required: false,
        default: "",
      },
      resource_type: {
        type: String,
        required: false,
        default: "",
      },
    },
    default: {},
  },
  gender: {
    type: String,
    required: true,
  },
  tag: {
    type: [String],
    required: true,
  },
  secret_key: {
    type: String,
    required: true,
  },
};

export const keysOfIModel = [
  ...keysOfIUserWAvatar,
  "isVerificate",
  "verificatePhoto",
  "gender",
  "tag",
  "secret_key",
];

export const ModelDefault: IModel = {
  ...UserWAvatarDefault,
  username: "***",
  isVerificate: false,
  verificatePhoto: {
    public_id: "***",
    secure_url: "***",
    url: "***",
    cl_type: "***",
    resource_type: "***",
  },
  gender: "***",
  tag: [],
  secret_key: "***",
};
