import { model, PaginateModel, Schema } from "mongoose";
import {
  IModeratorsModelsModel,
  IModeratorsModelsSchema,
} from "../interfaces/IModerators-Models";
import MongoosePaginate from "mongoose-paginate-v2";

const moderatorsModelsSchema: Schema = new Schema(IModeratorsModelsSchema, {
  timestamps: true,
});

moderatorsModelsSchema.plugin(MongoosePaginate);

export default model<
  IModeratorsModelsModel,
  PaginateModel<IModeratorsModelsModel>
>("Moderators-Models", moderatorsModelsSchema);
