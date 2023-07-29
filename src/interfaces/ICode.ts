import { Document } from "mongoose";
import { ROLES } from "../types.enum";

export enum CODETYPE {
  COUNTMASTER = ROLES.COUNTMASTER,
  ADMIN = ROLES.ADMIN,
  MODEL = ROLES.MODEL,
}
export enum CODETYPEACTION {
  DELTING = "deleting",
  CREATE = "create",
}
export interface ICode<> {
  code: string;
  hInit: "count-master" | "model";
  types: CODETYPE;
  action: CODETYPEACTION;
  doc?: any;
}

export interface ICodeM extends Omit<ICode, "fn"> {}
export interface ICodeModel extends Document, ICodeM {}

export const ICodeSchema = {
  code: {
    type: String,
    required: true,
  },
  hInit: {
    type: String,
    required: true,
  },
  types: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  doc: {
    type: Object,
    required: false,
    default: {},
  },
};

export const keysOfICode = ["code", "hInit", "doc"];
export const CodeDefault: ICode = {
  code: "***",
  hInit: "count-master",
  types: CODETYPE.MODEL,
  action: CODETYPEACTION.CREATE,
  doc: {},
};
