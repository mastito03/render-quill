'use strict'

const Promise = require('promise')
const jsdom = require('jsdom')
const quill = require.resolve('quill')
const mutationObserver = require.resolve('mutation-observer')

function _render (delta, options, scripts, formats, callback) {
  jsdom.env('<div id="editor"></div>', scripts, (err, window) => {
    if (err) return callback(err)

    window.document.getSelection = function () {
      return {
        getRangeAt: function () {}
      }
    }

      // register custom format
    for (let name in formats) {
      window.Quill.register(name, formats[name])
    }

    let quill = new window.Quill('#editor', options)

    quill.setContents(delta)

    callback(err, window.document.querySelector('.ql-editor').innerHTML)

    window.close()
  })
}

module.exports = function render (delta, options, callback) {
  // option is optional
  let args = []
  for (let i = 0; i < arguments.length; i++) {
    args.push(arguments[i])
  }

  delta = args.shift()

  callback = (typeof args[args.length - 1] === 'function') ? args.pop() : undefined

  if (args.length > 0) options = args.shift()
  else options = {}

  let scripts = [quill, mutationObserver]

  if (options.scripts !== undefined) scripts = scripts.concat(options.scripts)

  let formats = {}

  if (options.formats !== undefined) formats = options.formats

  if (typeof callback === 'function') { // Using challback
    return _render(delta, options, scripts, formats, callback)
  } else { // Using promise
    return new Promise(function (resolve, reject) {
      return _render(delta, options, scripts, formats, function (err, output) {
        if (err) return reject(err)
        return resolve(output)
      })
    })
  }
}
