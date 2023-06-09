import { Router } from "express";
import { adminController } from "./Admin";

const AdminRouter: Router = Router();

/* GET */
AdminRouter.get(adminController.pathGetAdmins, adminController.getAdmins);
AdminRouter.get(adminController.pathGetAdminById, adminController.getAdminById);

/* POST */
AdminRouter.post(adminController.pathPostAdmin, adminController.postAdmin);

/* PUT */
AdminRouter.put(adminController.pathPutAdminById, adminController.putAdminById);

/* DELETE */
AdminRouter.delete(
  adminController.pathDeleteAdminById,
  adminController.deleteAdminById
);

export default AdminRouter;
