import { Router } from "express";
import { followController } from "./Follow";

const FollowRouter: Router = Router();

/* GET */
FollowRouter.get(
  followController.pathGetFollowModel,
  followController.getFollowModel
);
FollowRouter.get(
  followController.pathGetFollowViewer,
  followController.getFollowViewer
);

/* POST */
FollowRouter.post(
  followController.pathPostSubscribe,
  followController.postSubscribe
);

/* DELETE */
FollowRouter.delete(
  followController.pathDeleteUnsubscribe,
  followController.deleteUnsubscribe
);

export default FollowRouter;
