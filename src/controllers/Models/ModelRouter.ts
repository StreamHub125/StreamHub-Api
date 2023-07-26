import { Router } from "express";
import { modelController } from "./Model";
import MulterInject from "../../utils/MulterImplementation";

const ModelRouter: Router = Router();
const Multer: MulterInject = new MulterInject({}, null);

/* GETS */
ModelRouter.get(modelController.pathGetModels, modelController.getModels);
ModelRouter.get(modelController.pathGetModelById, modelController.getModelById);

/* POST */
ModelRouter.post(modelController.pathPostModel, modelController.postModel);

/* PUT */
ModelRouter.put(modelController.pathPutModel, modelController.putModel);
ModelRouter.put(
  modelController.pathPutModelImageAvatar,
  Multer.multer.single("file"),
  modelController.putModelImageAvatar
);
ModelRouter.put(
  ///
  modelController.pathPutModelImageSale,
  Multer.multer.array("files"),
  modelController.putModelImageSale
);
ModelRouter.put(
  modelController.pathPutModelImageVerificate,
  Multer.multer.single("file"),
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
ModelRouter.delete(
  modelController.pathDeleteImage,
  modelController.deleteImages
);

export default ModelRouter;
