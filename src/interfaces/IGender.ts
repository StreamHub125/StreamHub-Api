import { Document } from "mongoose";

export interface IGender {
  genderName: string;
  genderDescription: string;
}

export interface IGenderM extends Omit<IGender, "fn"> {}
export interface IGenderModel extends Document, IGenderM {}

export const IGenderSchema = {
  genderName: {
    type: String,
    default: false,
  },
  genderDescription: {
    type: String,
    required: false,
  },
};

export const keysOfIFollow = ["genderName", "genderDescription"];
