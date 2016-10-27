# render-quill ![](https://travis-ci.org/mastito03/render-quill.svg?branch=master)
render quill delta to html string on server

## Example

using callback:

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

render(delta, (err, output) => {
  console.log("callback: " + output)
})
```

using promises:
``` js
var render = require('./index.js')

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

render(delta).then(output => {
  console.log("promise: " + output)
})
```
