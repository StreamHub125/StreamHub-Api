import { Router } from "express";
import { countMasterController } from "./CountMaster";

const CountMasterRouter: Router = Router();

/* GETS */
CountMasterRouter.get(
  countMasterController.pathGetCountMasters,
  countMasterController.getCountMasters
);
CountMasterRouter.get(
  countMasterController.pathGetCountMasterById,
  countMasterController.getCountMasterById
);

/* POST */
CountMasterRouter.post(
  countMasterController.pathPostCountMaster,
  countMasterController.postCountMaster
);

/* PUT */
CountMasterRouter.put(
  countMasterController.pathPutCountMaster,
  countMasterController.putCountMaster
);
/* DELETE */
CountMasterRouter.delete(
  countMasterController.pathDeleteCountMaster,
  countMasterController.deleteCountMaster
);
CountMasterRouter.delete(
  countMasterController.pathDeleteCountMasterConfirmation,
  countMasterController.deleteCountMasterConfirmation
);

export default CountMasterRouter;
