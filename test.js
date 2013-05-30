
var BASH = require('./')

console.log(BASH.stringify({
  foo: true, bar: 'whatever',
  baz: {
    foo: 'foofoo',
    bar: 1234
  }
}))
