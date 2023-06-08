import { model, Schema } from "mongoose";
import { IModelModel, IModelSchema } from "../interfaces/IModel";
import md5 from "md5";

const modelSchema: Schema = new Schema(IModelSchema, { timestamps: true });

modelSchema.methods.setPassword = function setPassword(password: string) {
  this.password = md5(password);
};

export default model<IModelModel>("Model", modelSchema);
