import express from "express"

import PasswordRecoveryController from "../controllers/recoveryPassword.js";
const router = express.Router();

router.route("/requestCode").post(PasswordRecoveryController.requestCode);
router.route("/verifyCode").post(PasswordRecoveryController.verifyCode);
router.route("/newPassword").post(PasswordRecoveryController.newPassword.apply);

export default router;