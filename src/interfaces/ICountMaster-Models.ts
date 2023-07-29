import { Document } from "mongoose";

export interface ICountMasterModels {
  idModel: string;
  idCountMaster: string;
  code: string;
}

export interface ICountMasterModelsM extends Omit<ICountMasterModels, "fn"> {}
export interface ICountMasterModelsModel
  extends Document,
    ICountMasterModelsM {}

export const ICountMasterModelsSchema = {
  idModel: {
    type: String,
    required: true,
  },
  idCountMaster: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: false,
    default: "***",
  },
};

export const keysOfICountMasterModels = ["idCountMaster", "idModel"];
export const CountMasterModelsDefault: ICountMasterModels = {
  idModel: "***",
  idCountMaster: "***",
  code: "***",
};
