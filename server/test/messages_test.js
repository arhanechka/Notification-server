process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var assert = require('assert');
var expect = require('chai').expect

chai.use(chaiHttp);

describe('/GET all messages', () => {
        it('it should find and should return array of found msg', (done) => {
            chai.request(server)
                .get('/messages')
                .type('json')
                 .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('msg').be.a('Array');
                    
                    done();
                });
        });
    });

    describe('/GET messages by status', () => {
        it('it should find and should return array of found msg with status false(unread)', (done) => {
            chai.request(server)
                .get('/messages/0')
                .type('json')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('msg').be.a('Array');
                    assert.equal(res.body.msg[0].status, false)
                    done();
                });
        });
    });

    describe('/UPDATE messages status', () => {
        it('it should update status of message by id and should return success: true and object with updated status(1)', (done) => {
            chai.request(server)
                .put('/messages/updateStatus')
                .type('json')
                .send({
                    status: 1,
                    id: 6
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('msg').be.a('Array');
                    assert.equal(res.body.msg[0], 1)
                    done();
                });
        });
    });