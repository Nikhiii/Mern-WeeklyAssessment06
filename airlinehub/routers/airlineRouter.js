const express = require("express");
const airlineController = require("../controllers/airlineController");
const router = express.Router();

router.get("/", airlineController.getAllAirlines);
router.get("/:id", airlineController.getAirlineById);
router.post("/", airlineController.addAirline);
router.post("/:id", airlineController.updateAirline);
router.delete("/:id", airlineController.deleteAirline);

module.exports = router;
