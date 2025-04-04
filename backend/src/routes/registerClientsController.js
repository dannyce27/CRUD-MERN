import express from "express";

import registerClientsController from "../controllers/registerClientsController.js";

const router  = express.Router()

router.route("/").post(registerClientsController.registerClients)
router.route("/verifyCodeEmail").post(registerClientsController.verifyCodeEmail)

export default router;
