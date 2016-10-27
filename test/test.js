var assert = require('assert')
var render = require('../index.js')

describe('#render() -> callback', function() {
    it('should render delta', function(done) {
      delta = {
        ops: [{
          insert: 'Hello',
          attributes: {
            italic: true
          }
        }, {
          insert: ' world!!'
        }]
      }
      html = "<p><em>Hello</em><span> world!!</span></p>"
      render(delta, (err, output) => {
        if (err) return done(err)
        done(assert.equal(output, html))
      })
  })
})

describe('#render() -> promise', function() {
    it('should render delta', function(done) {
      delta = {
        ops: [{
          insert: 'Hello',
          attributes: {
            italic: true
          }
        }, {
          insert: ' world!!'
        }]
      }
      html = "<p><em>Hello</em><span> world!!</span></p>"
      render(delta).then( output => {
        done(assert.equal(output, html))
      }).catch( error => { done(error) })
  })
})
