import { Router } from "express";
import { streamsController } from "./Streams";

const StreamsRouter: Router = Router();

/* GET */
StreamsRouter.get(
  streamsController.pathGetStreams,
  streamsController.getStreams
);
StreamsRouter.get(
  streamsController.pathGetStreamsByModelId,
  streamsController.getStreamsByModelId
);
StreamsRouter.get(
  streamsController.pathGetStreamsByModeratorId,
  streamsController.getStreamsByModeratorId
);
StreamsRouter.get(
  streamsController.pathGetStreamsByGenderId,
  streamsController.getStreamsByGenderId
);
StreamsRouter.get(
  streamsController.pathGetStreamsById,
  streamsController.getStreamsById
);

/* DELETE */
StreamsRouter.delete(
  streamsController.pathDeleteStreams,
  streamsController.deleteStreams
);

export default StreamsRouter;
