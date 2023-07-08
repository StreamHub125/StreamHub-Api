import { Document } from "mongoose";

export interface IHistory {
  urlStream: string;
  hourInit: string;
  hourFinish: string;
  date: string;
  idModel: string;
  idModerator: string;
  idGender: string;
  idTag: string;
}

export interface IHistoryM extends Omit<IHistory, "fn"> {}
export interface IHistoryModel extends Document, IHistoryM {}

export const IHistorySchema = {
  urlStream: {
    type: String,
    required: true,
  },
  hourInit: {
    type: String,
    required: true,
  },
  hourFinish: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    required: true,
  },
  idModel: {
    type: String,
    required: true,
  },
  idModerator: {
    type: String,
    required: true,
  },
  idGender: {
    type: String,
    required: true,
  },
  idTag: {
    type: String,
    required: true,
  },
};

export const keysOfIHistory = [
  "urlStream",
  "hourInit",
  "hourFinish",
  "idModel",
  "idModerator",
  "isLive",
  "idGender",
  "idTag",
];
