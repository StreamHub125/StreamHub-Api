import { Router } from "express";
import { countMasterModelsController } from "./CountMaster-Models";

const CountMasterModelsRouter: Router = Router();

/* GET */
CountMasterModelsRouter.get(
  countMasterModelsController.pathGetMDSModel,
  countMasterModelsController.getMDSModel
);
CountMasterModelsRouter.get(
  countMasterModelsController.pathGetMDSCountmaster,
  countMasterModelsController.getMDSCountmaster
);

/* POST */
CountMasterModelsRouter.post(
  countMasterModelsController.pathPostSubscribe,
  countMasterModelsController.postSubscribe
);

/* DELETE */
CountMasterModelsRouter.delete(
  countMasterModelsController.pathDeleteUnsubscribe,
  countMasterModelsController.deleteUnsubscribe
);

export default CountMasterModelsRouter;
