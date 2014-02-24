
exports.stringify = function (obj) {
  function lines (obj) {
    var l = [];
    for(var k in obj) {
      if('object' === typeof obj[k])
        lines(obj[k]).forEach(function (e) {
          l.push(k + '__' + e);
        });
      else
        l.push(k + '="' + obj[k] + '"\n');
    }
    return l;
  }

  return lines(obj).join('');
};

exports.parse = function parse (str) {
  var root = {};
  var line = null;
  var lines = str.split('\n');

  function tick () {
    return lines.shift();
  }

  function walk (line, scope) {
    var offset = 0;
    var ch = null;
    var buf = [];
    var key = null;
    var value = null;
    var isScalar = true;

    function unseen () { return line.substr(offset); }
    function advance () { return line[offset++]; }
    function peek () { return line[offset + 1]; }
    function prev () { return line[offset - 2]; }
    function join () { var b = buf.join(''); return buf = [], b; }

    while (ch = advance()) {
      switch (ch) {
        case '"': break;
        case '_':
          if ('_' == prev()) {
            isScalar = false;
            key = join();
            return walk(unseen(), scope[key] = scope[key] || {});
          }
          break;

        case '=':
          key = join();
          break;

        default:
          buf.push(ch);
          if (null != key && true == isScalar && null == peek()) {
            value = join();
            if ('true' == value || 'false' == value) {
              value = Boolean(value);
            } else if (!isNaN(Number(value))) {
              value = Number(value);
            }
            scope[key] = value;
          }
      }
    }
  }

  while (line = tick()) {
    walk(line, root);
  }

  return root;
};
