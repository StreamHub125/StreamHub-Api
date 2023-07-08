import { Document } from "mongoose";

export interface ICountMaster {
  companyName: string;
  idModeratorOwner: string;
  email: string;
  password: string;
  idModel: string[];
  idCrendentialPayment: string;
}

export interface ICountMasterM extends Omit<ICountMaster, "fn"> {}
export interface ICountMasterModel extends Document, ICountMasterM {}

export const ICountMasterSchema = {
  companyName: {
    type: String,
    required: true,
  },
  idModeratorOwner: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  idModel: {
    type: [String],
    required: true,
  },
  idCrendentialPayment: {
    type: String,
    required: true,
  },
};

export const keysOfICountMaster = [
  "companyName",
  "idModeratorOwner",
  "email",
  "password",
  "idModel",
  "idCrendentialPayment",
];
