import { Router } from "express";
import { moderatorController } from "./Moderator";
import MulterInject from "../../utils/MulterImplementation";

const ModeratorRouter: Router = Router();
const Multer = new MulterInject({}, null);

/* GET */
ModeratorRouter.get(
  moderatorController.pathGetModerators,
  moderatorController.getModerators
);
ModeratorRouter.get(
  moderatorController.pathGetModeratorById,
  moderatorController.getModeratorById
);

/* POST */
ModeratorRouter.post(
  moderatorController.pathPostModerator,
  moderatorController.postModerator
);

/* PUT */
ModeratorRouter.put(
  moderatorController.pathPutModerator,
  moderatorController.putModerator
);
ModeratorRouter.put(
  moderatorController.pathPutModeratorVerify,
  moderatorController.putModeratorVerify
);
ModeratorRouter.put(
  moderatorController.pathPutModeratorImageVerificate,
  Multer.multer.single("file"),
  moderatorController.putModeratorImageVerificate
);

/* DELETE */
ModeratorRouter.delete(
  moderatorController.pathDeleteModerator,
  moderatorController.deleteModerator
);
ModeratorRouter.delete(
  moderatorController.pathDeleteImage,
  moderatorController.deleteImages
);

export default ModeratorRouter;
