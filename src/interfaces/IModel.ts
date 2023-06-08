import { Document } from "mongoose";
import { IUserSchemaWAvatar, IUserWAvatar } from "./IUser";

export interface IModel extends IUserWAvatar {
  photos: {
    url: String;
    price: Number;
    approve: Boolean;
    dateApprove: String;
  }[];
  isVerificate: boolean;
  verificatePhoto?: string;
  gender: string;
  tag: string;
}

export interface IModelM extends Omit<IModel, "fn"> {}
export interface IModelModel extends Document, IModelM {}

export const IModelSchema = {
  ...IUserSchemaWAvatar,
  photos: [
    {
      type: {
        url: String,
        price: Number,
        approve: Boolean,
        dateApprove: String,
      },
      default: [],
    },
  ],
  isVerificate: {
    type: Boolean,
    default: false,
  },
  verificatePhoto: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
};
