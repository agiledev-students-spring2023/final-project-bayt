const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../../src/app.js");
const expect = chai.expect;


chai.use(chaiHttp);

describe("Profile Routes", () => {

  before(async () => {
    const hardcode_json = require("../../src/json/hardcode.json");
    hardcode_json.should.be.a("object").that.is.not.empty;
  });


  describe('GET /api/profile/:username', () => {

      it('should return a user profile', (done) => {
        const usernameFound = 'badbunny';

        chai.request(app)
          .get(`/profile/${usernameFound}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.username).to.equal(usernameFound);
            done();
          });
      });

      it('should return an error if the user profile does not exist', (done) => {
          const usernameNotFound = 'KimKardashian';


        chai.request(app)
          .get(`/profile/${usernameNotFound}`)
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.message).to.equal('User not found');
            done();
          });
      });
    });


  describe('PUT /api/profile/:username', () => {

    const updatedProfile = {
      email: 'updatedemail@example.com',
      firstname: 'Ben',
      lastname:'Bunny',
      role: 'testing',
      houses:'Bayt'
    };

    it('should update a user profile', (done) => {
      const username = 'badbunny';

      chai.request(app)
        .put(`/profile/${username}`)
        .send(updatedProfile)
        .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.include(updatedProfile);
        done();
        });
      });


      it('should return an error if the user profile does not exist', (done) => {
        const username = 'nonexistentuser';

        chai.request(app)
          .put(`/profile/${username}`)
          .send(updatedProfile)
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.error).to.equal('User not found');
            done();
          });
      });
    }); 
});
