import { model, PaginateModel, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import {
  ICountMasterModelsModel,
  ICountMasterModelsSchema,
} from "../interfaces/ICountMaster-Models";

const countMasterModelsSchema: Schema = new Schema(ICountMasterModelsSchema, {
  timestamps: true,
});

countMasterModelsSchema.plugin(MongoosePaginate);

export default model<
  ICountMasterModelsModel,
  PaginateModel<ICountMasterModelsModel>
>("Count-Master-Models", countMasterModelsSchema);
