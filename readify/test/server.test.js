const request = require('supertest');
const app = require('../server');
const mongoose = require("mongoose");
const Book = require("../models/bookModel");

let createdbookId;

describe('Endpoints', () => {

    it('should create a new book', async () => {
        const newBook = {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "genre": "Fiction",
            "publicationYear": 1925,
            "coverImage": "great-gatsby.jpg"
        };

        const response = await request(app)
            .post('/book')
            .send(newBook)
            .expect(200);

        createdbookId = response.body._id;

        expect(response.body.title).toEqual(newBook.title);
        expect(response.body.author).toEqual(newBook.author);
        expect(response.body.genre).toEqual(newBook.genre);
        expect(response.body.publicationYear).toEqual(newBook.publicationYear);
        expect(response.body.coverImage).toEqual(newBook.coverImage);
    });

    it('should retrieve all books', async () => {
        const response = await request(app)
            .get('/book')
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve a book by ID', async () => {
        const specificId = createdbookId;
        const response = await request(app)
            .get(`/book/${specificId}`)
            .expect(200);
    });

    it('should update a book by ID', async () => {
        const specificId = createdbookId;
        const updatedData = {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "genre": "Classic Fiction",
            "publicationYear": 1926,
            "coverImage": "great-gatsby.jpg"
        };

        const response = await request(app)
            .post(`/book/${specificId}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.title).toEqual(updatedData.title);
        expect(response.body.author).toEqual(updatedData.author);
        expect(response.body.genre).toEqual(updatedData.genre);
        expect(response.body.publicationYear).toEqual(updatedData.publicationYear);
        expect(response.body.coverImage).toEqual(updatedData.coverImage);
    });

    it('should delete a book by ID', async () => {
        const specificId = createdbookId;
        const response = await request(app)
            .delete(`/book/${specificId}`)
            .expect(200);
    });

    it('should expect 404 when an incorrect route is used for inserting a book', async () => {
        const newBook = {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "genre": "Fiction",
            "publicationYear": 1925,
            "coverImage": "great-gatsby.jpg"
        };
    
        const response = await request(app)
            .post('/books')
            .send(newBook)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving all books', async () => {
        const response = await request(app)
            .get('/books')
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving an book by ID', async () => {
        const specificId = createdbookId;
        const response = await request(app)
          .get(`/books/${specificId}`)
          .expect(404);
    });

    it('should expect 404 when an incorrect route is used for updating an book by ID', async () => {
        const specificId = createdbookId;
        const updatedData = {
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "genre": "Classic Fiction",
            "publicationYear": 1926,
            "coverImage": "great-gatsby.jpg"
        };

        const response = await request(app)
            .put(`/books/${specificId}`)
            .send(updatedData)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for deleting an book by ID', async () => {
        const specificId = createdbookId;
        const response = await request(app)
            .delete(`/books/${specificId}`)
            .expect(404);
    });
});