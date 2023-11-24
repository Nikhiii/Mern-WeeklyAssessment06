const request = require('supertest');
const app = require('../server');
const mongoose = require("mongoose");
const Movie = require("../models/movieModel");

let createdMovieId;

describe('Endpoints', () => {

    it('should create a new Movie', async () => {
        const newMovie = {
            "title": "Inception",
            "director": "Christopher Nolan",
            "genre": "Science Fiction",
            "releaseYear": 2010,
            "description": "A mind-bending science fiction thriller that explores the concept of dreams within dreams.",
            "userName": "MovieBuff123",
            "rating": 5,
            "text": "Absolutely mind-blowing! Christopher Nolan at his best."
        };          

        const response = await request(app)
            .post('/movie')
            .send(newMovie)
            .expect(200);

        createdMovieId = response.body._id;

        expect(response.body.title).toEqual(newMovie.title);
        expect(response.body.director).toEqual(newMovie.director);
        expect(response.body.genre).toEqual(newMovie.genre);
        expect(response.body.releaseYear).toEqual(newMovie.releaseYear);
        expect(response.body.description).toEqual(newMovie.description);

    });

    it('should retrieve all Movies', async () => {
        const response = await request(app)
            .get('/movie')
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve a Movie by ID', async () => {
        const specificId = createdMovieId;
        const response = await request(app)
            .get(`/movie/${specificId}`)
            .expect(200);
    });

    it('should update a Movie by ID', async () => {
        const specificId = createdMovieId;
        const updatedData = {
            "title": "Avatar",
            "director": "James Cameron",
            "genre": "Science Fiction",
            "releaseYear": 2009,
            "description": "A visually stunning science fiction epic set on the planet Pandora.",
            "userName": "Cinephile123",
            "rating": 5,
            "text": "One of the best movies I've ever seen! A must-watch."
        };          

        const response = await request(app)
            .post(`/movie/${specificId}`)
            .send(updatedData)
            .expect(200);

            expect(response.body.title).toEqual(updatedData.title);
            expect(response.body.director).toEqual(updatedData.director);
            expect(response.body.genre).toEqual(updatedData.genre);
            expect(response.body.releaseYear).toEqual(updatedData.releaseYear);
            expect(response.body.description).toEqual(updatedData.description);
    });

    it('should delete a Movie by ID', async () => {
        const specificId = createdMovieId;
        const response = await request(app)
            .delete(`/movie/${specificId}`)
            .expect(200);
    });

    it('should expect 404 when an incorrect route is used for inserting a Movie', async () => {
        const newMovie = {
            "title": "Inception",
            "director": "Christopher Nolan",
            "genre": ["Science Fiction", "Action"],
            "releaseYear": 2010,
            "description": "A mind-bending science fiction thriller that explores the concept of dreams within dreams.",
            "userName": "MovieBuff123",
            "rating": 5,
            "text": "Absolutely mind-blowing! Christopher Nolan at his best."
        };          
    
        const response = await request(app)
            .post('/movies')
            .send(newMovie)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving all Movies', async () => {
        const response = await request(app)
            .get('/movies')
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving an Movie by ID', async () => {
        const specificId = createdMovieId;
        const response = await request(app)
          .get(`/movies/${specificId}`)
          .expect(404);
    });

    it('should expect 404 when an incorrect route is used for updating an Movie by ID', async () => {
        const specificId = createdMovieId;
        const updatedData = {
            "title": "Avatar",
            "director": "James Cameron",
            "genre": ["Science Fiction", "Adventure"],
            "releaseYear": 2009,
            "description": "A visually stunning science fiction epic set on the planet Pandora.",
            "userName": "Cinephile123",
            "rating": 5,
            "text": "One of the best movies I've ever seen! A must-watch."
              
        };          

        const response = await request(app)
            .post(`/movies/${specificId}`)
            .send(updatedData)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for deleting an Movie by ID', async () => {
        const specificId = createdMovieId;
        const response = await request(app)
            .delete(`/movies/${specificId}`)
            .expect(404);
    });

});
