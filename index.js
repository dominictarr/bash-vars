

exports.stringify = function (obj) {

  function lines (obj) {
    var l = []
    for(var k in obj) {
      if('object' === typeof obj[k])
        lines(obj[k]).forEach(function (e) {
          l.push(k + '__' + e)
        })
      else
        l.push(k + '="' + obj[k] + '"\n')
    }
    return l
  }

  return lines(obj).join('')
}

exports.parse = function (str) {
  throw new Error('error: not implemented. please make pull-request')
}
