import IService from "../interfaces/IService";
import { IViewer } from "../interfaces/IViewer";
import ViewerSchema from "../schemas/Viewer";

export default class ViewerService implements IService<IViewer> {
  constructor() {}
  async Create(item: IViewer): Promise<IViewer> {
    const viewer: IViewer = {
      ...item,
    };

    const newViewer = new ViewerSchema(viewer);
    const viewerCreate = await newViewer.save();

    return viewerCreate;
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
  async Find(query: object, set: object): Promise<any | null> {
    try {
      const viewer = await ViewerSchema.paginate(query, set);
      return viewer;
    } catch (error) {
      return null;
    }
  }
}
