import salesController from "../controllers/salesController.js"
import express from "express"

const router = express.Router();

router.route("/").post(salesController.insertSales);


router.route("/category").get(salesController.salesPerCategory)
router.route("/best-products").get(salesController.bestSallingProducts)
router.route("/frecuent-customer").get(salesController.frecuentCustomers)
router.route("/total-earnings").get(salesController.totalEarnings)

export default router;