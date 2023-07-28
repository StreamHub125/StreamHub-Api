import { Document } from "mongoose";

export interface ITag {
  name: string;
  description: string;
}

export interface ITagM extends Omit<ITag, "fn"> {}
export interface ITagModel extends Document, ITagM {}

export const ITagSchema = {
  name: {
    type: String,
    default: false,
  },
  description: {
    type: String,
    required: false,
  },
};

export const keysOfITag = ["tagName", "tagDescription"];
export const TagDefault: ITag = {
  name: "***",
  description: "***",
};
