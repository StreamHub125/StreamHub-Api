import App from "./app";
import { adminController } from "./controllers/Admins/Admin";
import AdminRouter from "./controllers/Admins/AdminRouter";
import { modelController } from "./controllers/Models/Model";
import ModelRouter from "./controllers/Models/ModelRouter";
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

app.init();

nms.run();
