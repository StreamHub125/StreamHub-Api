import { Document } from "mongoose";

export interface IAdminVerificated {
  types: "model" | "moderator";
  idAdmin: string;
  idUser: string;
}

export interface AdminVerificatedM extends Omit<IAdminVerificated, "fn"> {}
export interface AdminVerificatedModel extends Document, AdminVerificatedM {}

export const IAdminVerificatedSchema = {
  types: {
    type: String,
    required: true,
  },
  idAdmin: {
    type: String,
    required: true,
  },
  idUser: {
    type: String,
    required: true,
  },
};

export const keysOfIAdminVerificated = ["idUser", "idAdmin", "types"];
export const AdminVerificatedDefault: IAdminVerificated = {
  types: "model",
  idAdmin: "***",
  idUser: "***",
};
