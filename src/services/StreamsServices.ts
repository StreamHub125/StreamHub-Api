import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import IService from "../interfaces/IService";
import { IStreams } from "../interfaces/IStreams";
import StremasSchema from "../schemas/Streams";
import { WID } from "../types";

export default class StreamsService implements IService<IStreams> {
  async Create(item: IStreams): Promise<IStreams | null> {
    const stream: IStreams = {
      ...item,
    };

    try {
      const newStream = new StremasSchema(stream);
      const streamCreate = await newStream.save();

      return streamCreate;
    } catch (error) {
      return null;
    }
  }
  async Update(filter: object, update: object): Promise<IStreams | null> {
    try {
      const stream = await StremasSchema.findOneAndUpdate(filter, update);
      return stream;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const streamDelete = await StremasSchema.findOneAndRemove({
        _id: id,
      });
      return streamDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<WID<IStreams> | null> {
    try {
      const stream = await StremasSchema.findById(id);
      return stream;
    } catch (error) {
      return null;
    }
  }
  async Find(
    query: object,
    set: object
  ): Promise<PaginatedResult<IStreams> | null> {
    try {
      const stream = await StremasSchema.paginate(query, set);
      return stream;
    } catch (error) {
      return null;
    }
  }
}
