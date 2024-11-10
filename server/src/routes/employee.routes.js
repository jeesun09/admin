import { Router } from "express";
import {
  createEmployee,
  getEmployees,
} from "../controllers/employee.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/get-employees").get(getEmployees);
router.route("/create-employee").post(upload.single("image"), createEmployee);

export default router;
