import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import IService from "../interfaces/IService";
import { IViewer } from "../interfaces/IViewer";
import ViewerSchema from "../schemas/Viewer";

export default class ViewerService implements IService<IViewer> {
  constructor() {}
  async Create(item: IViewer): Promise<IViewer | null> {
    const viewer: IViewer = {
      ...item,
    };

    try {
      const newViewer = new ViewerSchema(viewer);
      const viewerCreate = await newViewer.save();
      return viewerCreate;
    } catch (error) {
      return null;
    }
  }
  async Update(filter: object, update: object): Promise<IViewer | null> {
    try {
      const viewer = await ViewerSchema.findOneAndUpdate(filter, update);
      return viewer;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const viewerDelete = await ViewerSchema.findOneAndRemove({ _id: id });
      return viewerDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<IViewer | null> {
    try {
      const viewer = await ViewerSchema.findById(id);
      return viewer;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<IViewer> | null> {
    try {
      const viewer = await ViewerSchema.paginate(query, set);
      return viewer;
    } catch (error) {
      return null;
    }
  }
}
