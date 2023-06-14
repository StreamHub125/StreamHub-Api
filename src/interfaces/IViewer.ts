import { Document } from "mongoose";
import { IUser, IUserSchema } from "./IUser";

export interface IViewer extends IUser {}

export interface IViewerM extends Omit<IViewer, "fn"> {}
export interface IViewerModel extends Document, IViewerM {}

export const IViewerSchema = {
  ...IUserSchema,
};
