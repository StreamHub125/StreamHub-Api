import { model, PaginateModel, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import md5 from "md5";
import { IViewerModel, IViewerSchema } from "../interfaces/IViewer";

const viewerSchema: Schema = new Schema(IViewerSchema, { timestamps: true });

viewerSchema.plugin(MongoosePaginate);

viewerSchema.methods.setPassword = function setPassword(password: string) {
  this.password = md5(password);
};

export default model<IViewerModel, PaginateModel<IViewerModel>>(
  "Viewer",
  viewerSchema
);
