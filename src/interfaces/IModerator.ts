import { Document } from "mongoose";
import {
  AvatarType,
  IUser,
  IUserSchema,
  UserDefault,
  keysOfIUser,
} from "./IUser";

export interface IModerator extends IUser {
  isVerificate: boolean;
  verificatePhoto?: AvatarType;
  permissions: number;
  admin: string;
}

export interface IModeratorM extends Omit<IModerator, "fn"> {}
export interface IModeratorModel extends Document, IModeratorM {}

export const IModeratorSchema = {
  ...IUserSchema,
  permissions: {
    type: Number,
    default: 1,
  },
  admin: {
    type: String,
    required: true,
  },
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
};

export const keysOfIModerator = [
  ...keysOfIUser,
  "permissions",
  "isVerificate",
  "verificatePhoto",
  "admin",
];

export const ModeratorDefault: IModerator = {
  ...UserDefault,
  verificatePhoto: {
    public_id: "***",
    secure_url: "***",
    url: "***",
    cl_type: "***",
    resource_type: "***",
  },
  permissions: 1,
  isVerificate: false,
  admin: "***",
};
