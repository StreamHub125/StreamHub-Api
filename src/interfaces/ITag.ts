import { Document } from "mongoose";

export interface ITag {
  tagName: string;
  tagDescription: string;
}

export interface ITagM extends Omit<ITag, "fn"> {}
export interface ITagModel extends Document, ITagM {}

export const ITagSchema = {
  tagName: {
    type: String,
    default: false,
  },
  tagDescription: {
    type: String,
    required: false,
  },
};

export const keysOfITag = ["tagName", "tagDescription"];
