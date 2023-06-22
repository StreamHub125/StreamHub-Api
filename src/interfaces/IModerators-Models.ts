import { Document } from "mongoose";

export interface IModeratorsModels {
  idModel: string;
  idModerator: string;
}

export interface IModeratorsModelsM extends Omit<IModeratorsModels, "fn"> {}
export interface IModeratorsModelsModel extends Document, IModeratorsModelsM {}

export const IModeratorsModelsSchema = {
  idModel: {
    type: String,
    required: true,
  },
  idModerator: {
    type: String,
    required: true,
  },
};

export const keysOfIModeratorsModels = ["idModerator", "idModel"];
