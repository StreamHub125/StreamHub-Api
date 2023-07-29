import App from "./app";
import { adminController } from "./controllers/Admins/Admin";
import AdminRouter from "./controllers/Admins/AdminRouter";
import { followController } from "./controllers/Follow/Follow";
import FollowRouter from "./controllers/Follow/FollowRouter";
import { genderController } from "./controllers/Gender/Gender";
import genderRouter from "./controllers/Gender/GenderRouter";
import { historyController } from "./controllers/History/History";
import HistoryRouter from "./controllers/History/HistoryRouter";
import { modelController } from "./controllers/Models/Model";
import ModelRouter from "./controllers/Models/ModelRouter";
import { moderatorController } from "./controllers/Moderator/Moderator";
import ModeratorRouter from "./controllers/Moderator/ModeratorRouter";
import { moderatorsModelsController } from "./controllers/Moderators-Models/Moderators-Models";
import ModeratorsModelRouter from "./controllers/Moderators-Models/Moderators-ModelsRouter";
import { streamsController } from "./controllers/Streams/Streams";
import StreamsRouter from "./controllers/Streams/StreamsRouter";
import { tagController } from "./controllers/Tag/Tag";
import TagRouter from "./controllers/Tag/TagRouter";
import { viewerController } from "./controllers/Viewer/Viewer";
import ViewerRouter from "./controllers/Viewer/ViewerRouter";
import nms from "./services/streamService/serverstream";
import { ENVIRONMENTS } from "./utils/const";
import DontEnv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { countMasterModelsController } from "./controllers/CountMaster-Models/CountMaster-Models";
import CountMasterModelsRouter from "./controllers/CountMaster-Models/CountMaster-ModelsRouter";
import CountMasterRouter from "./controllers/CountMaster/CountMasterRouter";
import { countMasterController } from "./controllers/CountMaster/CountMaster";

DontEnv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});
//ENVIRONMENTS.URL_MONGO_CONNECTION,
const app: App = new App(
  process.env.MONGODB_LOCAL ?? ENVIRONMENTS.URL_MONGO_CONNECTION,
  ENVIRONMENTS.PORT,
  `/api-v${ENVIRONMENTS.VERSION_APPLICATION}`
);
app.description(ENVIRONMENTS.DESCRIPTION_APPLICATION);

// Admin Controller Import
app.import(adminController, AdminRouter);
// Coutn Master Controller Import
app.import(countMasterController, CountMasterRouter);
// Coutn Master Models Controller Import
app.import(countMasterModelsController, CountMasterModelsRouter);
// Follow Controller Import
app.import(followController, FollowRouter);
// Gender Controller Import
app.import(genderController, genderRouter);
// History Controller Import
app.import(historyController, HistoryRouter);
// Model Controller Import
app.import(modelController, ModelRouter);
// Moderator Controller Import
app.import(moderatorController, ModeratorRouter);
// Moderators Models Controller Import
app.import(moderatorsModelsController, ModeratorsModelRouter);
// Streams Controller Import
app.import(streamsController, StreamsRouter);
// Tag Controller Import
app.import(tagController, TagRouter);
// Viewer Controller Import
app.import(viewerController, ViewerRouter);

app.init();

nms.run();
