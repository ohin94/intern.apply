const request = require('supertest');
const expect = require('chai').expect;
const mysql = require('mysql2');

const app = require('../../../server');
const db = require('../db.connection.test');

describe('question.route.js', () => {

    beforeEach((done) => {
        db.conn.query(`DROP TABLE IF EXISTS question`, (err, res) => {
            db.conn.query(`CREATE TABLE question (
                id INT NOT NULL AUTO_INCREMENT,
                title VARCHAR(45) NOT NULL,
                body VARCHAR(1000) NOT NULL,
                author VARCHAR(45) NOT NULL,
                creationTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id))`,
            (err, res) => {
                db.conn.query(`INSERT INTO question (id, title, author, body) VALUES
                    (1, 'first test title', 'Dima', 'this is the body'),
                    (2, 'how much time to find a job?', 'Ben', 'I dont want to wait'),
                    (3, 'what are you looking at?', 'dima', 'this is just a question')`,
                (err, res) => {
                    done();
                });
            });
        });
    });

    describe('GET /question', () => {

        it('should return all existing questions', (done) => {
            request(app)
                .get('/api/question')
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(3);
                })
                .end(done);
        });

        it('should return the correct first question', (done) => {
            request(app)
                .get('/api/question')
                .expect(200)
                .expect(res => {
                    let firstQuestion = res.body[0];
                    expect(firstQuestion.title).to.equal('first test title');
                    expect(firstQuestion.author).to.equal('Dima');
                    expect(firstQuestion.body).to.equal('this is the body');
                })
                .end(done);
        });

    });

    describe('POST /question', () => {

        it('should create a new question', (done) => {
            request(app)
                .post('/api/question')
                .send({ title: 'testtitle', body: 'testbody', author: 'testauthor'})
                .expect(200)
                .expect(res => {
                    expect(res.body.title).to.equal('testtitle');
                    expect(res.body.author).to.equal('testauthor');
                    expect(res.body.body).to.equal('testbody');
                })
                .end(done);
        });

        it('should return an error message with code 7 for invalid question title', (done) => {
            request(app)
                .post('/api/question')
                .send({ title: '', body: 'testbody', author: 'testauthor'})
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].code).to.equal(7);
                })
                .end(done);
        });

        it('should return an error message with code 8 for invalid question body', (done) => {
            request(app)
                .post('/api/question')
                .send({ title: 'testtitle', body: '', author: 'testauthor'})
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].code).to.equal(8);
                })
                .end(done);
        });

        it('should return an error message with code 9 for invalid question author', (done) => {
            request(app)
                .post('/api/question')
                .send({ title: 'testtitle', body: 'testbody', author: ''})
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(1);
                    expect(res.body[0].code).to.equal(9);
                })
                .end(done);
        });

        it('should retur an error with 3 different codes for all invalid fields', (done) => {
            request(app)
                .post('/api/question')
                .send({ title: '', body: '', author: ''})
                .expect(400)
                .expect(res => {
                    expect(res.body).to.have.lengthOf(3);
                    expect(res.body[0].code).to.equal(7);
                    expect(res.body[1].code).to.equal(8);
                    expect(res.body[2].code).to.equal(9);
                })
                .end(done);
        });

    });

    describe('GET /question/:id', () => {

        it('should get the correct existing question by its id', (done) => {
            request(app)
                .get('/api/question/1')
                .expect(200)
                .expect(res => {
                    expect(res.body.title).to.equal('first test title');
                    expect(res.body.author).to.equal('Dima');
                    expect(res.body.body).to.equal('this is the body');
                })
                .end(done);
        });

        it('should return no questino for a question id that does not exist', (done) => {
            request(app)
                .get('/api/question/999')
                .expect(200)
                .expect(res => {
                    expect(res.body).to.exist;
                    expect(res.body.title).to.equal(undefined);
                    expect(res.body.author).to.equal(undefined);
                    expect(res.body.body).to.equal(undefined);
                })
                .end(done);
        });

        it('should return an error message with code 31 for an id that is a decimal', (done) => {
            request(app)
                .get('/api/question/3.14159')
                .expect(400)
                .expect(err => {
                    expect(err.body).to.have.lengthOf(1);
                    expect(err.body[0].code).to.equal(31);
                })
                .end(done);
        });

        it('should return an error message with code 31 for an id that is not a number', (done) => {
            request(app)
                .get('/api/question/TEST')
                .expect(400)
                .expect(err => {
                    expect(err.body).to.have.lengthOf(1);
                    expect(err.body[0].code).to.equal(31);
                })
                .end(done);
        });

    });

});