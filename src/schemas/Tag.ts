import { model, PaginateModel, Schema } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";
import { ITag, ITagModel, ITagSchema } from "../interfaces/ITag";

const tagSchema: Schema = new Schema(ITagSchema, { timestamps: true });

tagSchema.plugin(MongoosePaginate);

export default model<ITag, PaginateModel<ITagModel>>("Tag", tagSchema);
