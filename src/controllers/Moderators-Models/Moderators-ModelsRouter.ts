import { Router } from "express";
import { moderatorsModelsController } from "./Moderators-Models";

const ModeratorsModelRouter: Router = Router();

/* GET */
ModeratorsModelRouter.get(
  moderatorsModelsController.pathGetMDSModel,
  moderatorsModelsController.getMDSModel
);
ModeratorsModelRouter.get(
  moderatorsModelsController.pathGetMDSModerator,
  moderatorsModelsController.getMDSModerator
);

/* POST */
ModeratorsModelRouter.post(
  moderatorsModelsController.pathPostSubscribe,
  moderatorsModelsController.postSubscribe
);

/* DELETE */
ModeratorsModelRouter.delete(
  moderatorsModelsController.pathDeleteUnsubscribe,
  moderatorsModelsController.deleteUnsubscribe
);

export default ModeratorsModelRouter;
