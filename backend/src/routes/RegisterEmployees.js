import express from "express"
import RegisterEmployeesController from "../controllers/RegisterEmployeeController.js";
const router = express.Router();

router.route("/").post(RegisterEmployeesController.register)

export default router