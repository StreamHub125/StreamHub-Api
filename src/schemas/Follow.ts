import { model, PaginateModel, Schema } from "mongoose";
import { IFollowModel, IFollowSchema } from "../interfaces/IFollow";
import MongoosePaginate from "mongoose-paginate-v2";

const followSchema: Schema = new Schema(IFollowSchema, {
  timestamps: true,
});

followSchema.plugin(MongoosePaginate);

export default model<IFollowModel, PaginateModel<IFollowModel>>(
  "Follow",
  followSchema
);
