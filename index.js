'use strict'

const jsdom = require('jsdom')
const quill = require.resolve('quill')
const mutationObserver = require.resolve('mutation-observer')

module.exports = function render (delta, options, callback) {
  // option is optional
  let args = []
  for (let i = 0; i < arguments.length; i++) {
    args.push(arguments[i])
  }

  delta = args.shift()

  callback = args.pop()

  if (args.length > 0) options = args.shift()
  else options = {}

  let scripts = [quill, mutationObserver]

  if (options.scripts !== undefined) scripts += options.scripts

  let bolts = []

  if (options.bolts !== undefined) bolts = options.bolts

  jsdom.env('<div id="editor"></div>', scripts, (err, window) => {
    if (err) return callback(err)

    window.document.getSelection = function () {
      return {
        getRangeAt: function () {}
      }
    }

    for (let i = 0; i < bolts.length; i++) {
      window.Quill.register(bolts[i])
    }

    let quill = new window.Quill('#editor', options)

    quill.setContents(delta)

    callback(err, window.document.querySelector('.ql-editor').innerHTML)

    window.close()
  })
}
