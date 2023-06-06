import { Router } from "express";
import { modelController } from "./Model";

const ModelRouter: Router = Router();

ModelRouter.get(modelController.pathGetModels, modelController.getModels);

export default ModelRouter;
