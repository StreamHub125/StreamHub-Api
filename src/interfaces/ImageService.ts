import { MulterImage } from "../types";

export interface PropsMiddleWareFile {
  file: MulterImage;
  userName?: string;
}
export interface PropsMiddleWareDelete {
  file: string;
  userName?: string;
}
export default interface IImageService {
  postUpload(data: any): void;
  postDelete(data: any): void;
  middlewareFileUpload<Type>(data: PropsMiddleWareFile): Promise<Type | null>;
  middlewareFileDelete(data: any): void;
}
