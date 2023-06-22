import { Document } from "mongoose";

export interface IFollow {
  idModel: string;
  idViewer: string;
}

export interface IFollowM extends Omit<IFollow, "fn"> {}
export interface IFollowModel extends Document, IFollowM {}

export const IFollowSchema = {
  idModel: {
    type: String,
    required: true,
  },
  idViewer: {
    type: String,
    required: true,
  },
};

export const keysOfIFollow = ["idViewer", "idModel"];
