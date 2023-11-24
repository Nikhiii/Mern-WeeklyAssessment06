const express = require("express");
const emissionController = require("../controllers/emissionController");
const router = express.Router();

router.get("/", emissionController.getAllEmissions);
router.get("/:id", emissionController.getEmissionById);
router.post("/", emissionController.addEmission);
router.post("/:id", emissionController.updateEmission);
router.delete("/:id", emissionController.deleteEmission);

module.exports = router;
