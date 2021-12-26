const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=Conrad')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Conrad');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({"surname":"Colombo"
        })
        .end(function (err, res) {
          assert.equal(res.status, 200,'response status should be 200');
          assert.equal(res.type, 'application/json', 'response should be json');
          assert.equal(res.body.name, 'Cristoforo', 'body name should be Cristoforo');
          assert.equal(res.body.surname, 'Colombo', 'body surname should be Colombo');
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) 
    {
      chai
        .request(server)
        .put('/travellers')
        .send({"surname":"da Verrazzano"})
      .end(function (err, res){
        assert.equal(res.status, 200, 'response status should be 200');
        assert.equal(res.type, 'application/json', 'response should be json');
        assert.equal(res.body.name, 'Giovanni', 'body name should be Giovanni');
        assert.equal(res.body.surname, 'da Verrazzano', 'body surname should be da Verrazzano');
        done();
      });
    });
  });
});
const Browser = require("zombie");
Browser.site = "https://boilerplate-mochachai.cstemmer.repl.co";

suite("Functional Tests with Zombie.js", function() {
  const browser = new Browser();

  suiteSetup(function(done) {
    return browser.visit("/", done);
  });

  suite('"Famous Italian Explorers" form', function(){
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser.fill('surname', 'Colombo').then(() => {
        browser.pressButton('submit', () => {
          browser.assert.success();
          browser.assert.text('span#name', 'Cristoforo', 'name should be Cristoforo');
          browser.assert.text('span#surname', 'Colombo', 'surname should be Colombo');
          browser.assert.elements('span#dates', 1, 'date should be 1');
          done();
        });
      });
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser.fill('surname', 'Vespucci').then(() => {
        browser.pressButton('submit', () => {
          browser.assert.success();
          browser.assert.text('span#name', 'Amerigo', 'name should be Amerigo');
          browser.assert.text('span#surname', 'Vespucci', 'surname should be Vespucci');
          browser.assert.elements('span#dates', 1, 'date should be 1');
          done();
        });
      });
    });
  });
});
