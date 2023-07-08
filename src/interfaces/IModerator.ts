import { Document } from "mongoose";
import { IUser, IUserSchema, keysOfIUser } from "./IUser";

export interface IModerator extends IUser {
  models: string[];
  isVerificate: boolean;
  verificatePhoto?: string;
  permissions: number;
  isOwner: boolean;
}

export interface IModeratorM extends Omit<IModerator, "fn"> {}
export interface IModeratorModel extends Document, IModeratorM {}

export const IModeratorSchema = {
  ...IUserSchema,
  models: {
    type: [String],
    default: [],
  },
  permissions: {
    type: Number,
    default: 1,
  },
  isVerificate: {
    type: Boolean,
    default: false,
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
  verificatePhoto: {
    type: String,
    required: false,
  },
};

export const keysOfIModerator = [
  ...keysOfIUser,
  "permissions",
  "models",
  "isOwner",
  "isVerificate",
  "verificatePhoto",
];
