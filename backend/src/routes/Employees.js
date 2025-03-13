//import de la libreria express
import express from "express";
import Employees from "../controllers/EmployeesController";

//router nos ayuda a cargar los metodos que tendra mi ruta 
const router = express.Router();

router.route("/")
.get(Employees.getEmployees)
.post(Employees.createEmployes)
router.route("/:id")
.put(Employees.updateEmployee)
.delete(Employees.deleteEmployee);

export default router;