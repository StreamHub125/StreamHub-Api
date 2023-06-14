import { model, PaginateModel, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import md5 from "md5";
import { IModeratorModel, IModeratorSchema } from "../interfaces/IModerator";

const moderatorSchema: Schema = new Schema(IModeratorSchema, {
  timestamps: true,
});

moderatorSchema.plugin(MongoosePaginate);

moderatorSchema.methods.setPassword = function setPassword(password: string) {
  this.password = md5(password);
};

export default model<IModeratorModel, PaginateModel<IModeratorModel>>(
  "Moderator",
  moderatorSchema
);
