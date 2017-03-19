const app = require('../server.js')
const request = require('supertest')
const expect = require('chai').expect

describe('books', function () {
  it('Should get all books', function (done) {
    request(app)
      .get('/api/book/')
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

  it('Should create a new book', function (done) {
    request(app)
      .post('/api/book/')
      .send([{
        title: 'Test Book',
        auther: 'Ibrahim',
        pageNumber: '666'
      }])
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

  it('Should get one book', function (done) {
    request(app)
      .post('/api/book/')
      .send([{
        title: 'Test Book',
        auther: 'Ibrahim',
        pageNumber: '666'
      }])
      .set('Accept', 'application/json')
      .end(function (err, resp) {
        if (err) {
          console.log(err)
        }
        var book = resp.body
        request(app)
          .get('/api/book/' + book.title)
          .end(function (err, resp) {
            if (err) {
              throw new Error(err)
            }
            expect(resp.body.book.title).to.equal('Test Book')
            done()
          })
      })
      done()
  })
})
