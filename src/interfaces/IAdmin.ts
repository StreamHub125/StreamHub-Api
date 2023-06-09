import { Document } from "mongoose";
import { IUser, IUserSchema, UserDefault, keysOfIUser } from "./IUser";

export interface IAdmin extends IUser {
  permissions: number;
}

export interface IAdminM extends Omit<IAdmin, "fn"> {}
export interface IAdminModel extends Document, IAdminM {}

export const IAdminSchema = {
  ...IUserSchema,
  permissions: {
    type: Number,
    default: 0,
  },
};

export const keysOfAdmin = [...keysOfIUser, "permissions"];

export const AdminDefault: IAdmin = {
  ...UserDefault,
  permissions: 0,
};
