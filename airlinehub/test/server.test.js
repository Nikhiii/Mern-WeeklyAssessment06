const request = require('supertest');
const app = require('../server');
const mongoose = require("mongoose");
const Airline = require('../models/airlineModel');

let createdAirlineId;

describe('Endpoints', () => {

    it('should have required fields with specified data types', () => {
        const airline = new Airline();
        const validationResult = airline.validateSync();
        const { errors } = validationResult;
      
        const expectedDataTypes = {
          airline: 'string',
          flightNumber: 'string',
          departureCity: 'string',
          arrivalCity: 'string',
          departureTime: 'date',
          arrivalTime: 'date',
        };

        Object.keys(expectedDataTypes).forEach((fieldName) => {
          expect(errors[fieldName]).toBeDefined();
          expect(errors[fieldName].kind).toBe('required');
          expect(airline[fieldName]).toBeUndefined();
          
          const receivedDataType = Airline.schema.path(fieldName).instance.toLowerCase();
          const expectedDataType = expectedDataTypes[fieldName].toLowerCase();
          
          expect(receivedDataType).toBe(expectedDataType);
        });
    });

    it('should create a new airline', async () => {
    const newAirline = {
        airline: 'Test Airline',
        flightNumber: '123',
        departureCity: 'City A',
        arrivalCity: 'City B',
        departureTime: new Date(),
        arrivalTime: new Date(),
    };

        const response = await request(app)
            .post('/airline')
            .send(newAirline)
            .expect(200);

            createdAirlineId = response.body._id;

            expect(response.body.airline).toEqual(newAirline.airline);
            expect(response.body.flightNumber).toEqual(newAirline.flightNumber);
            expect(response.body.departureCity).toEqual(newAirline.departureCity);
            expect(response.body.arrivalCity).toEqual(newAirline.arrivalCity);
    });

    it('should retrieve all airlines', async () => {
        const response = await request(app)
        .get('/airline')
        .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve an airline by ID', async () => {
        const specificId = createdAirlineId;
        const response = await request(app)
          .get(`/airline/${specificId}`)
          .expect(200);
    });
      
    it('should update an airline by ID', async () => {
        const specificId = createdAirlineId;
        const updatedData = {
            airline: 'Updated Airline',
            flightNumber: '456',
            departureCity: 'City C',
            arrivalCity: 'City D',
            departureTime: new Date(),
            arrivalTime: new Date(),
        };

        const response = await request(app)
            .post(`/airline/${specificId}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.airline).toEqual(updatedData.airline);
        expect(response.body.flightNumber).toEqual(updatedData.flightNumber);
        expect(response.body.departureCity).toEqual(updatedData.departureCity);
        expect(response.body.arrivalCity).toEqual(updatedData.arrivalCity);
    });
    
    it('should delete an airline by ID', async () => {
        const specificId = createdAirlineId;
        const response = await request(app)
            .delete(`/airline/${specificId}`)
            .expect(200);
    });

    it('should expect 404 when an incorrect route is used for inserting a airlines', async () => {
        const newAirline = {
            airline: 'Test Airline',
            flightNumber: '123',
            departureCity: 'City A',
            arrivalCity: 'City B',
            departureTime: new Date(),
            arrivalTime: new Date(),
        };
    
        const response = await request(app)
            .post('/airlines')
            .send(newAirline)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving all airlines', async () => {
        const response = await request(app)
            .get('/airlines')
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving an airline by ID', async () => {
        const specificId = createdAirlineId;
        const response = await request(app)
          .get(`/airlines/${specificId}`)
          .expect(404);
    });

    it('should expect 404 when an incorrect route is used for updating an airline by ID', async () => {
        const specificId = createdAirlineId;
        const updatedData = {
            airline: 'Updated Airline',
            flightNumber: '456',
            departureCity: 'City C',
            arrivalCity: 'City D',
            departureTime: new Date(),
            arrivalTime: new Date(),
        };

        const response = await request(app)
            .put(`/airlines/${specificId}`)
            .send(updatedData)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for deleting an airline by ID', async () => {
        const specificId = createdAirlineId;
        const response = await request(app)
            .delete(`/airlines/${specificId}`)
            .expect(404);
    });

});
