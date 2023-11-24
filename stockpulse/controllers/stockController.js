const Stock = require("../models/stockModel");

const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({});
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findById(id);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addStock = async (req, res) => {
  try {
    const stock = await Stock.create(req.body);
    res.status(200).json(stock);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findByIdAndUpdate(id, req.body);
    if (!stock) {
      return res
        .status(404)
        .json({ message: `cannot find any stock with ID ${id}` });
    }
    const updatedStock = await Stock.findById(id);
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findByIdAndDelete(id);
    if (!stock) {
      return res
        .status(404)
        .json({ message: `cannot find any stock with ID ${id}` });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllStocks,
  getStockById,
  addStock,
  updateStock,
  deleteStock,
};
