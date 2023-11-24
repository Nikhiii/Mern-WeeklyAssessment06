const Airline = require("../models/airlineModel");

const getAllAirlines = async (req, res) => {
  try {
    const airlines = await Airline.find({});
    res.status(200).json(airlines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAirlineById = async (req, res) => {
  try {
    const { id } = req.params;
    const airline = await Airline.findById(id);
    res.status(200).json(airline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addAirline = async (req, res) => {
  try {
    const airline = await Airline.create(req.body);
    res.status(200).json(airline);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateAirline = async (req, res) => {
  try {
    const { id } = req.params;
    const airline = await Airline.findByIdAndUpdate(id, req.body);
    if (!airline) {
      return res
        .status(404)
        .json({ message: `cannot find any airline with ID ${id}` });
    }
    const updatedAirline = await Airline.findById(id);
    res.status(200).json(updatedAirline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAirline = async (req, res) => {
  try {
    const { id } = req.params;
    const airline = await Airline.findByIdAndDelete(id);
    if (!airline) {
      return res
        .status(404)
        .json({ message: `cannot find any airline with ID ${id}` });
    }
    res.status(200).json(airline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllAirlines,
  getAirlineById,
  addAirline,
  updateAirline,
  deleteAirline,
};
