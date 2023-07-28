import { Document } from "mongoose";
import { SaveService } from "../types";
import { saveServiceDefault } from "../utils/const";

export interface IImages {
  idModel: string;
  saveService: SaveService;
  /* Implementar */
}

export interface IImagesM extends Omit<IImages, "fn"> {}
export interface IImagesModel extends Document, IImagesM {}

export const IImagesSchema = {
  idModel: {
    type: String,
    required: true,
  },
  saveService: {
    required: true,
    type: Object,
  },
};

export const keysOfIImages = ["idModel", "saveService"];

export const ImagesDefault: IImages = {
  idModel: "***",
  saveService: saveServiceDefault,
};
