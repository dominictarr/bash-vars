
var BASH = require('../');
var assert = require('assert');

var line = null;
var lines = null;
var str = null;
var parsed = null;
var expected = null;
var o = {
  foo: true, bar: 'whatever',
  baz: {
    foo: 'foofoo',
    bar: 1234,
    a: {
      foo: 'foo',
      bar: 'bar',
      b: {
        foo: 'foo',
        bar: 'bar',
        c: { foo: 'foo'}
      }
    }
  }
};

str = BASH.stringify(o);

expected = [
  'foo="true"', // .foo
  'bar="whatever"', // .bar
  'baz__foo="foofoo"', //.baz.foo
  'baz__bar="1234"', //.baz.bar
  'baz__a__foo="foo"', // .baz.a.foo
  'baz__a__bar="bar"', // .baz.a.bar
  'baz__a__b__foo="foo"', // .baz.a.b.foo
  'baz__a__b__bar="bar"', // .baz.a.b.foo
  'baz__a__b__c__foo="foo"', // .baz.a.b.c.foo
  'baz__a__b__c__bar="bar"', // .baz.a.b.c.foo
];

lines = str.split('\n');
while (line = lines.shift()) {
  assert(expected.indexOf(line) > -1, line);
}

parsed = BASH.parse(str);
assert(parsed);
assert(Object.keys(parsed));

assert(o.foo == parsed.foo);
assert(o.bar == parsed.bar);
assert(o.baz.foo == parsed.baz.foo);
assert(o.baz.bar == parsed.baz.bar);
assert(o.baz.a.foo == parsed.baz.a.foo);
assert(o.baz.a.bar == parsed.baz.a.bar);
assert(o.baz.a.b.foo == parsed.baz.a.b.foo);
assert(o.baz.a.b.bar == parsed.baz.a.b.bar);
assert(o.baz.a.b.c.foo == parsed.baz.a.b.c.foo);
assert(o.baz.a.b.c.bar == parsed.baz.a.b.c.bar);

