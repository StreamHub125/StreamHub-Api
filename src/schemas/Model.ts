import { model, PaginateModel, Schema } from "mongoose";
import { IModelModel, IModelSchema } from "../interfaces/IModel";
import MongoosePaginate from "mongoose-paginate-v2";
import md5 from "md5";

const modelSchema: Schema = new Schema(IModelSchema, { timestamps: true });

modelSchema.plugin(MongoosePaginate);

modelSchema.methods.setPassword = function setPassword(password: string) {
  this.password = md5(password);
};

export default model<IModelModel, PaginateModel<IModelModel>>(
  "Model",
  modelSchema
);
