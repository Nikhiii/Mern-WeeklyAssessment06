const request = require('supertest');
const app = require('../server');
const mongoose = require("mongoose");
const Product = require("../models/productModel");

let createdProductId;

describe('Endpoints', () => {

    it('should create a new product', async () => {
        const newProduct = {
            name: 'Test Product',
            quantity: 10,
            price: 29.99,
            image: 'testImage.jpg'
        };

        const response = await request(app)
            .post('/product')
            .send(newProduct)
            .expect(200);

        createdProductId = response.body._id;

        expect(response.body.name).toEqual(newProduct.name);
        expect(response.body.quantity).toEqual(newProduct.quantity);
        expect(response.body.price).toEqual(newProduct.price);
        expect(response.body.image).toEqual(newProduct.image);
    });

    it('should retrieve all products', async () => {
        const response = await request(app)
            .get('/product')
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve a product by ID', async () => {
        const specificId = createdProductId;
        const response = await request(app)
            .get(`/product/${specificId}`)
            .expect(200);
    });

    it('should update a product by ID', async () => {
        const specificId = createdProductId;
        const updatedData = {
            name: 'Updated Product',
            quantity: 15,
            price: 39.99,
            image: 'updated.jpg',
        };

        const response = await request(app)
            .post(`/product/${specificId}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.name).toEqual(updatedData.name);
        expect(response.body.quantity).toEqual(updatedData.quantity);
        expect(response.body.price).toEqual(updatedData.price);
        expect(response.body.image).toEqual(updatedData.image);
    });

    it('should delete a product by ID', async () => {
        const specificId = createdProductId;
        const response = await request(app)
            .delete(`/product/${specificId}`)
            .expect(200);
    });

    it('should expect 404 when an incorrect route is used for inserting a product', async () => {
        const newProduct = {
            name: 'Test Product',
            quantity: 10,
            price: 29.99,
            image: 'testImage.jpg'
        };
    
        const response = await request(app)
            .post('/products')
            .send(newProduct)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving all products', async () => {
        const response = await request(app)
            .get('/products')
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving an product by ID', async () => {
        const specificId = createdProductId;
        const response = await request(app)
          .get(`/products/${specificId}`)
          .expect(404);
    });

    it('should expect 404 when an incorrect route is used for updating an product by ID', async () => {
        const specificId = createdProductId;
        const updatedData = {
            name: 'Updated Product',
            quantity: 15,
            price: 39.99,
            image: 'updated.jpg',
        };

        const response = await request(app)
            .put(`/products/${specificId}`)
            .send(updatedData)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for deleting an product by ID', async () => {
        const specificId = createdProductId;
        const response = await request(app)
            .delete(`/products/${specificId}`)
            .expect(404);
    });

});
