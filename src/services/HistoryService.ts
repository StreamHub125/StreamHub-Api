import { IHistory } from "../interfaces/IHistory";
import IService from "../interfaces/IService";
import HistorySchema from "../schemas/History";

export default class HistoryService implements IService<IHistory> {
  async Create(item: IHistory): Promise<IHistory> {
    const history: IHistory = {
      ...item,
    };

    const newHistory = new HistorySchema(history);
    const historyCreate = await newHistory.save();

    return historyCreate;
  }
  async Update(filter: object, update: object): Promise<IHistory | null> {
    try {
      const history = await HistorySchema.findOneAndUpdate(filter, update);
      return history;
    } catch (error) {
      return null;
    }
  }
  async Delete(id: string): Promise<any> {
    try {
      const historyDelete = await HistorySchema.findOneAndRemove({
        _id: id,
      });
      return historyDelete;
    } catch (error) {
      return null;
    }
  }
  async FindById(id: string): Promise<IHistory | null> {
    try {
      const history = await HistorySchema.findById(id);
      return history;
    } catch (error) {
      return null;
    }
  }
  async Find(query: object, set: object): Promise<any | null> {
    try {
      const history = await HistorySchema.paginate(query, set);
      return history;
    } catch (error) {
      return null;
    }
  }
}
