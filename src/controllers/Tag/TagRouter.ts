import { Router } from "express";
import { tagController } from "./Tag";

const TagRouter: Router = Router();

/* GET */
TagRouter.get(tagController.pathGetTags, tagController.getTags);
TagRouter.get(tagController.pathGetTagById, tagController.getTagById);

/* POST */
TagRouter.post(tagController.pathPostTag, tagController.postTag);

/* PUT */
TagRouter.put(tagController.pathPutTagById, tagController.putTagById);

/* DELETE */
TagRouter.delete(tagController.pathDeleteTagById, tagController.deleteTagById);

export default TagRouter;
