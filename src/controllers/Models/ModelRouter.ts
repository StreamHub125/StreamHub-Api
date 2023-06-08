import { Router } from "express";
import { modelController } from "./Model";

const ModelRouter: Router = Router();

/* GETS */
ModelRouter.get(modelController.pathGetModels, modelController.getModels);
ModelRouter.get(modelController.pathGetModelById, modelController.getModelById);
ModelRouter.get(
  modelController.pathGetModelByTag,
  modelController.getModelByTag
);
ModelRouter.get(
  modelController.pathGetModelByLive,
  modelController.getModelByLive
);
ModelRouter.get(
  modelController.pathGetModelByVerificate,
  modelController.getModelByVerificate
);
ModelRouter.get(
  modelController.pathGetModelByPopularity,
  modelController.getModelByPopularity
);
ModelRouter.get(
  modelController.pathGetModelByPopularityTag,
  modelController.getModelByPopularityTag
);

/* POST */
ModelRouter.post(modelController.pathPostModel, modelController.postModel);

/* PUT */
ModelRouter.put(modelController.pathPutModel, modelController.putModel);
ModelRouter.put(
  modelController.pathPutModelImageAvatar,
  modelController.putModelImageAvatar
);
ModelRouter.put(
  modelController.pathPutModelImageSale,
  modelController.putModelImageSale
);
ModelRouter.put(
  modelController.pathPutModelImageVerificate,
  modelController.putModelImageVerificate
);
ModelRouter.put(
  modelController.pathPutModelIsVerificate,
  modelController.putModelIsVerificate
);

/* DELETE */
ModelRouter.delete(
  modelController.pathDeleteModel,
  modelController.deleteModel
);

export default ModelRouter;
