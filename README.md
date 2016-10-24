## Usage

simple:

``` js
var render = require('render-quill')

var delta = {
  ops: [{
    insert: 'Hello',
    attributes: {
      bold: true
    }
  }, {
    insert: ' world!!'
  }]
}

render(delta, function (err, output) {
  console.log(output)
})
```
