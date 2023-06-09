import { Router } from "express";
import { genderController } from "./Gender";

const genderRouter: Router = Router();

/* GET */
genderRouter.get(genderController.pathGetGenders, genderController.getGenders);
genderRouter.get(
  genderController.pathGetGenderById,
  genderController.getGenderById
);

/* POST */
genderRouter.post(genderController.pathPostGender, genderController.postGender);

/* PUT */
genderRouter.put(
  genderController.pathPutGenderById,
  genderController.putGenderById
);

/* DELETE */
genderRouter.delete(
  genderController.pathDeleteGenderById,
  genderController.deleteGenderById
);

export default genderRouter;
