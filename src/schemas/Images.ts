import { model, PaginateModel, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import { IImagesModel, IImagesSchema } from "../interfaces/IImages";

const imagesSchema: Schema = new Schema(IImagesSchema, {
  timestamps: true,
});

imagesSchema.plugin(MongoosePaginate);

export default model<IImagesModel, PaginateModel<IImagesModel>>(
  "Images",
  imagesSchema
);
