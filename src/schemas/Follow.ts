import { model, PaginateModel, Schema } from "mongoose";
import { IFollowModel, IFollowSchema } from "../interfaces/IFollow";

const followSchema: Schema = new Schema(IFollowSchema, {
  timestamps: true,
});

export default model<IFollowModel, PaginateModel<IFollowModel>>(
  "Follow",
  followSchema
);
