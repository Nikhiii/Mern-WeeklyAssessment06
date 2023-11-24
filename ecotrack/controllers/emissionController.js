const Emission = require("../models/emissionModel");

const getAllEmissions = async (req, res) => {
  try {
    const emissions = await Emission.find({});
    res.status(200).json(emissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getEmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const emission = await Emission.findById(id);
    res.status(200).json(emission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addEmission = async (req, res) => {
  try {
    const emission = await Emission.create(req.body);
    res.status(200).json(emission);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const updateEmission = async (req, res) => {
  try {
    const { id } = req.params;
    const emission = await Emission.findByIdAndUpdate(id, req.body);
    if (!emission) {
      return res
        .status(404)
        .json({ message: `cannot find any emission with ID ${id}` });
    }
    const updatedEmission = await Emission.findById(id);
    res.status(200).json(updatedEmission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteEmission = async (req, res) => {
  try {
    const { id } = req.params;
    const emission = await Emission.findByIdAndDelete(id);
    if (!emission) {
      return res
        .status(404)
        .json({ message: `cannot find any emission with ID ${id}` });
    }
    res.status(200).json(emission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllEmissions,
  getEmissionById,
  addEmission,
  updateEmission,
  deleteEmission,
};
