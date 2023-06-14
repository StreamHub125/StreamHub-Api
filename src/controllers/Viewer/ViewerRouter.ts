import { Router } from "express";
import { viewerController } from "./Viewer";

const ViewerRouter: Router = Router();

/* GET */
ViewerRouter.get(viewerController.pathGetViewers, viewerController.getViewers);
ViewerRouter.get(
  viewerController.pathGetViewerById,
  viewerController.getViewerById
);

/* POST */
ViewerRouter.post(viewerController.pathPostViewer, viewerController.postViewer);

/* PUT */
ViewerRouter.put(viewerController.pathPutViewer, viewerController.putViewer);

/* DELETE */
ViewerRouter.delete(
  viewerController.pathDeleteViewer,
  viewerController.deleteViewer
);

export default ViewerRouter;
