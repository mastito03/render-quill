var assert = require('assert')
var render = require('../index.js')

describe('#render()', function() {
    it('should render delta', function() {
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
        assert.equal(output, html)
      })
  })
})
