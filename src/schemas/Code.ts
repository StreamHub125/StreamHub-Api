import { model, PaginateModel, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import { ICodeModel, ICodeSchema } from "../interfaces/ICode";

const codeSchema: Schema = new Schema(ICodeSchema, {
  timestamps: true,
});

codeSchema.plugin(MongoosePaginate);

export default model<ICodeModel, PaginateModel<ICodeModel>>("Code", codeSchema);
