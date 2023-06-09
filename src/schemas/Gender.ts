import { model, PaginateModel, Schema } from "mongoose";
import { IGender, IGenderModel, IGenderSchema } from "../interfaces/IGender";
import MongoosePaginate from "mongoose-paginate-v2";

const genderSchema: Schema = new Schema(IGenderSchema, { timestamps: true });

genderSchema.plugin(MongoosePaginate);

export default model<IGender, PaginateModel<IGenderModel>>(
  "Gender",
  genderSchema
);
