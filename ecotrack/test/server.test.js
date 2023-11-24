const request = require('supertest');
const app = require('../server');
const mongoose = require("mongoose");
const Emission = require("../models/emissionModel");

let createdEmissionId;

describe('Endpoints', () => {

    it('should create a new Emission', async () => {
        const newEmission = {
            "username": "john_doe",
            "date": "2023-10-10T14:30:00Z",
            "emissions": 10.5,
            "location": "New York",
            "source": "Car"
        };          

        const response = await request(app)
            .post('/emission')
            .send(newEmission)
            .expect(200);

        createdEmissionId = response.body._id;

        expect(response.body.username).toEqual(newEmission.username);
        expect(response.body.emissions).toEqual(newEmission.emissions);
        expect(response.body.location).toEqual(newEmission.location);
        expect(response.body.source).toEqual(newEmission.source);
    });

    it('should retrieve all Emissions', async () => {
        const response = await request(app)
            .get('/emission')
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve a Emission by ID', async () => {
        const specificId = createdEmissionId;
        const response = await request(app)
            .get(`/emission/${specificId}`)
            .expect(200);
    });

    it('should update a Emission by ID', async () => {
        const specificId = createdEmissionId;
        const updatedData = {
            "username": "john_doe",
            "date": "2023-10-10T14:30:00Z",
            "emissions": 11.8,
            "location": "New York",
            "source": "Car"
        };

        const response = await request(app)
            .post(`/emission/${specificId}`)
            .send(updatedData)
            .expect(200);

            expect(response.body.username).toEqual(updatedData.username);
            expect(response.body.emissions).toEqual(updatedData.emissions);
            expect(response.body.location).toEqual(updatedData.location);
            expect(response.body.source).toEqual(updatedData.source);
    });

    it('should delete a Emission by ID', async () => {
        const specificId = createdEmissionId;
        const response = await request(app)
            .delete(`/emission/${specificId}`)
            .expect(200);
    });

    it('should expect 404 when an incorrect route is used for inserting a Emission', async () => {
        const newEmission = {
            "username": "john_doe",
            "date": "2023-10-10T14:30:00Z",
            "emissions": 10.5,
            "location": "New York",
            "source": "Car"
        };          
    
        const response = await request(app)
            .post('/emissions')
            .send(newEmission)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving all Emissions', async () => {
        const response = await request(app)
            .get('/emissions')
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving an Emission by ID', async () => {
        const specificId = createdEmissionId;
        const response = await request(app)
          .get(`/emissions/${specificId}`)
          .expect(404);
    });

    it('should expect 404 when an incorrect route is used for updating an Emission by ID', async () => {
        const specificId = createdEmissionId;
        const updatedData = {
            "username": "john_doe",
            "date": "2023-10-10T14:30:000Z",
            "emissions": 11.8,
            "location": "New York",
            "source": "Car"
        };

        const response = await request(app)
            .post(`/emissions/${specificId}`)
            .send(updatedData)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for deleting an Emission by ID', async () => {
        const specificId = createdEmissionId;
        const response = await request(app)
            .delete(`/emissions/${specificId}`)
            .expect(404);
    });

});
