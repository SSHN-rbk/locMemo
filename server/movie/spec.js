const app = require('../server.js')
const request = require('supertest')
const expect = require('chai').expect

describe('movies', function () {
  it('Should get all movies', function (done) {
    request(app)
      .get('/api/movie/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, resp) {
        if (err) {
          throw new Error(err)
        }
        expect(resp.body).to.be.an('array')
        done()
      })
  })

  it('Should create a new movie', function (done) {
    request(app)
      .post('/api/movie/')
      .send({
        name: 'Test movie',
        director: 'Ibrahim',
        rate: 666
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
        expect(resp.body).to.be.an('object')
        done()
      })
  })

  it('Should get one movie', function (done) {
    request(app)
      .post('/api/movie/')
      .send({
        name: 'Test movie',
        director: 'Ibrahim',
        rate: 666
      })
      .set('Accept', 'application/json')
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
        var movie = resp.body
        request(app)
          .get('/api/movie/' + movie.name)
          .end(function (err, resp) {
            if (err) {
              throw new Error(err)
            }
            expect(resp.body.movie.name).to.equal('Test movie')
            done()
          })
      })
      done()
  })
})
