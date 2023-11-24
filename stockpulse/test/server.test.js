const request = require('supertest');
const app = require('../server');
const mongoose = require("mongoose");
const Stock = require("../models/stockModel");

let createdStockId;

describe('Endpoints', () => {

    it('should create a new Stock', async () => {
        const newStock = {
            "ticker": "AAPL",
            "name": "Apple Inc.",
            "price": 150.25,
            "volume": 1000000
        };
          

        const response = await request(app)
            .post('/stock')
            .send(newStock)
            .expect(200);

        createdStockId = response.body._id;

        expect(response.body.ticker).toEqual(newStock.ticker);
        expect(response.body.name).toEqual(newStock.name);
        expect(response.body.price).toEqual(newStock.price);
        expect(response.body.volume).toEqual(newStock.volume);
    });

    it('should retrieve all Stocks', async () => {
        const response = await request(app)
            .get('/stock')
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve a Stock by ID', async () => {
        const specificId = createdStockId;
        const response = await request(app)
            .get(`/stock/${specificId}`)
            .expect(200);
    });

    it('should update a Stock by ID', async () => {
        const specificId = createdStockId;
        const updatedData = {
            "ticker": "AAPL",
            "name": "Apple Inc.",
            "price": 155.50,
            "volume": 1200000
        };

        const response = await request(app)
            .post(`/stock/${specificId}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.ticker).toEqual(updatedData.ticker);
        expect(response.body.name).toEqual(updatedData.name);
        expect(response.body.price).toEqual(updatedData.price);
        expect(response.body.volume).toEqual(updatedData.volume);
    });

    it('should delete a Stock by ID', async () => {
        const specificId = createdStockId;
        const response = await request(app)
            .delete(`/stock/${specificId}`)
            .expect(200);
    });

    it('should expect 404 when an incorrect route is used for inserting a Stock', async () => {
        const newStock = {
            "ticker": "AAPL",
            "name": "Apple Inc.",
            "price": 150.25,
            "volume": 1000000
        };
    
        const response = await request(app)
            .post('/stocks')
            .send(newStock)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving all Stocks', async () => {
        const response = await request(app)
            .get('/stocks')
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving an Stock by ID', async () => {
        const specificId = createdStockId;
        const response = await request(app)
          .get(`/stocks/${specificId}`)
          .expect(404);
    });

    it('should expect 404 when an incorrect route is used for updating an Stock by ID', async () => {
        const specificId = createdStockId;
        const updatedData = {
            "ticker": "AAPL",
            "name": "Apple Inc.",
            "price": 155.50,
            "volume": 1200000
        };

        const response = await request(app)
            .post(`/stocks/${specificId}`)
            .send(updatedData)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for deleting an Stock by ID', async () => {
        const specificId = createdStockId;
        const response = await request(app)
            .delete(`/stocks/${specificId}`)
            .expect(404);
    });

});
