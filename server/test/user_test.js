process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

    /*
     * Test the get / route
     */
    // describe('/GET', () => {
    //     it('it should GET under construction page', (done) => {
    //         chai.request(server)
    //             .get('/')
    //             .end((err, res) => {
    //                 console.log(err);
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('message').eql("Page under construction.");
    //                 done();
    //             });
    //     });
    // });

    /*
     * Test the /signup route with existent email
     */
    describe('/GET user by unexisted email', () => {
        it('it should NOT find and should return FALSE and proper msg', (done) => {
            chai.request(server)
                .post('/users/signin')
                .type('json')
                .send({
                    email: "none@gmail.com"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    done();
                });
        });
    });

    describe('/POST signup email exists', () => {
        it('it should NOT signup and should return FALSE and proper msg', (done) => {
            chai.request(server)
                .post('/users/signup')
                .type('json')
                .send({
                    email: "aranvic1975@gmail.com",
                    password: "1111"
                })
                .end((err, res) => {
                    console.log(res.body.msg);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('msg').eql('email already exists.');
                    done();
                });
        });
    });