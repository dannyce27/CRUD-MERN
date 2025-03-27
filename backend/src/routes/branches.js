//import de la libreria express
import express from "express";
import branchesController from "../controllers/branchesController.js";

//router nos ayuda a cargar los metodos que tendra mi ruta 
const router = express.Router();

router.route("/")
.get(branchesController.getBranches)
.post(branchesController.createBranches)
router.route("/:id")
.put(branchesController.updateBranches)
.delete(branchesController.deleteBranches);

export default router;