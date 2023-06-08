import App from "./app";
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

app.import(modelController, ModelRouter);

app.init();

nms.run();
