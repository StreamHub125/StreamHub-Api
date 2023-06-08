import { Router } from "express";
import { modelController } from "./Model";

const ModelRouter: Router = Router();

ModelRouter.get(modelController.pathGetModel, modelController.getModel);

export default ModelRouter;
