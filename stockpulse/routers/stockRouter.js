const express = require("express");
const stockController = require("../controllers/stockController");
const router = express.Router();

router.get("/", stockController.getAllStocks);
router.get("/:id", stockController.getStockById);
router.post("/", stockController.addStock);
router.post("/:id", stockController.updateStock);
router.delete("/:id", stockController.deleteStock);

module.exports = router;
