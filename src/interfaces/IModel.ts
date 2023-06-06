import { Document } from "mongoose";

export interface IModel {
  idProduct: string;
  comment: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  cc: string;
  avatar: string;
  photos: Array<string>;
}

export interface IModelM extends Omit<IModel, "fn"> {}
export interface IModelModel extends Document, IModelM {}
