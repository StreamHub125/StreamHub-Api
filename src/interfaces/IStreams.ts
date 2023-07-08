import { Document } from "mongoose";

export interface IStreams {
  urlStream: string;
  hourInit: string;
  hourFinish: string;
  idModel: string;
  idModerator: string;
  isLive: boolean;
  idGender: string;
  idTag: string;
  date: string;
}

export interface IStreamsM extends Omit<IStreams, "fn"> {}
export interface IStreamsModel extends Document, IStreamsM {}

export const IStreamsSchema = {
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
  isLive: {
    type: Boolean,
    default: false,
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

export const keysOfIStreams = [
  "urlStream",
  "hourInit",
  "hourFinish",
  "idModel",
  "idModerator",
  "isLive",
  "idGender",
  "idTag",
];
