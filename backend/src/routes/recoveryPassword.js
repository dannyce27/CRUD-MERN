import express from "express"

import PasswordRecoveryController from "../controllers/recoveryPassword.js";
const router = express.router()

router.route("/requestCode").post(PasswordRecoveryController.requestCode);
//router.route("/verifyCode").post();
//router.route("/newPassword").post();

export default router;