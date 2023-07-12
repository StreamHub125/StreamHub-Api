import { PaginatedResult } from "../interfaces/IDocumentsResponse";
import IService from "../interfaces/IService";
import { IStreams } from "../interfaces/IStreams";
import StremasSchema from "../schemas/Streams";

export default class StreamsService implements IService<IStreams> {
  async Create(item: IStreams): Promise<IStreams> {
    const stream: IStreams = {
      ...item,
    };

    const newStream = new StremasSchema(stream);
    const streamCreate = await newStream.save();

    return streamCreate;
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
  async FindById(id: string): Promise<IStreams | null> {
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
