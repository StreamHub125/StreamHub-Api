import { Document } from "mongoose";

export interface IGender {
  name: string;
  description: string;
}

export interface IGenderM extends Omit<IGender, "fn"> {}
export interface IGenderModel extends Document, IGenderM {}

export const IGenderSchema = {
  name: {
    type: String,
    default: false,
  },
  description: {
    type: String,
    required: false,
  },
};

export const keysOfIGender = ["name", "description"];
export const GenderDefault: IGender = {
  name: "***",
  description: "***",
};
