import App from "./app";
import { adminController } from "./controllers/Admins/Admin";
import AdminRouter from "./controllers/Admins/AdminRouter";
import { followController } from "./controllers/Follow/Follow";
import FollowRouter from "./controllers/Follow/FollowRouter";
import { genderController } from "./controllers/Gender/Gender";
import genderRouter from "./controllers/Gender/GenderRouter";
import { modelController } from "./controllers/Models/Model";
import ModelRouter from "./controllers/Models/ModelRouter";
import { moderatorController } from "./controllers/Moderator/Moderator";
import ModeratorRouter from "./controllers/Moderator/ModeratorRouter";
import { moderatorsModelsController } from "./controllers/Moderators-Models/Moderators-Models";
import ModeratorsModelRouter from "./controllers/Moderators-Models/Moderators-ModelsRouter";
import { tagController } from "./controllers/Tag/Tag";
import TagRouter from "./controllers/Tag/TagRouter";
import { viewerController } from "./controllers/Viewer/Viewer";
import ViewerRouter from "./controllers/Viewer/ViewerRouter";
import nms from "./services/streamService/serverstream";
import { Claudinary, ENVIRONMENTS } from "./utils/const";
import DontEnv from "dotenv";

DontEnv.config();
Claudinary();
const app: App = new App(
  ENVIRONMENTS.URL_MONGO_CONNECTION,
  ENVIRONMENTS.PORT,
  `/api-v${ENVIRONMENTS.VERSION_APPLICATION}`
);
app.description(ENVIRONMENTS.DESCRIPTION_APPLICATION);

// Model Controller Import
app.import(modelController, ModelRouter);
// Admin Controller Import
app.import(adminController, AdminRouter);
// Gender Controller Import
app.import(genderController, genderRouter);
// Tag Controller Import
app.import(tagController, TagRouter);
// Viewer Controller Import
app.import(viewerController, ViewerRouter);
// Moderator Controller import
app.import(modelController, ModelRouter);
// Moderator Controller Import
app.import(moderatorController, ModeratorRouter);
// Follow Controller Import
app.import(followController, FollowRouter);
// Moderators Models Controller Import
app.import(moderatorsModelsController, ModeratorsModelRouter);

app.init();

nms.run();
