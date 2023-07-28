import { Document } from "mongoose";
import { IUser, IUserSchema, UserDefault, keysOfIUser } from "./IUser";

//TODO: Implementar Follow
export interface IViewer extends IUser {
  gender: string;
}

export interface IViewerM extends Omit<IViewer, "fn"> {}
export interface IViewerModel extends Document, IViewerM {}

export const IViewerSchema = {
  ...IUserSchema,
  gender: {
    type: String,
    required: true,
  },
};

export const keysOfIViewer = [...keysOfIUser, "gender"];
export const ViewerDefaoult: IViewer = {
  ...UserDefault,
  gender: "***",
};
