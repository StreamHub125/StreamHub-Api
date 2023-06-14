import { model, PaginateModel, Schema } from "mongoose";
import {
  IModeratorsModelsModel,
  IModeratorsModelsSchema,
} from "../interfaces/IModerators-Models";

const moderatorsModelsSchema: Schema = new Schema(IModeratorsModelsSchema, {
  timestamps: true,
});

export default model<
  IModeratorsModelsModel,
  PaginateModel<IModeratorsModelsModel>
>("Moderators-Models", moderatorsModelsSchema);
