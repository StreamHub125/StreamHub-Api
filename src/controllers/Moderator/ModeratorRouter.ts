import { Router } from "express";
import { moderatorController } from "./Moderator";

const ModeratorRouter: Router = Router();

/* GET */
ModeratorRouter.get(
  moderatorController.pathGetModerators,
  moderatorController.getModerators
);
ModeratorRouter.get(
  moderatorController.pathGetModeratorById,
  moderatorController.getModeratorById
);
ModeratorRouter.get(
  moderatorController.pathGetModeratorByVerificate,
  moderatorController.getModeratorByVerificate
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
  moderatorController.pathPutModeratorAddModel,
  moderatorController.putModeratorAddModel
);
ModeratorRouter.put(
  moderatorController.pathPutModeratorImageVerificate,
  moderatorController.putModeratorImageVerificate
);

/* DELETE */
ModeratorRouter.delete(
  moderatorController.pathDeleteModerator,
  moderatorController.deleteModerator
);

export default ModeratorRouter;
