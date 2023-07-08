import { Router } from "express";
import { historyController } from "./History";

const HistoryRouter: Router = Router();

/* GET */
HistoryRouter.get(
  historyController.pathGetHistorys,
  historyController.getHistorys
);
HistoryRouter.get(
  historyController.pathGetHistorysById,
  historyController.getHistoryById
);
HistoryRouter.get(
  historyController.pathGetHistoryByModelId,
  historyController.getHistoryByModeratorId
);
HistoryRouter.get(
  historyController.pathGetHistoryByModeratorId,
  historyController.getHistoryByModeratorId
);
HistoryRouter.get(
  historyController.pathGetHistoryByDate,
  historyController.getHistoryByDate
);

/* DELETE */
HistoryRouter.delete(
  historyController.pathDeleteHistory,
  historyController.deleteHistory
);

export default HistoryRouter;
