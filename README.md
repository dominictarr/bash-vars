# bash-vars

turn a js object into something you can access from bash.

JSON is a subset of javascript, and bash-vars is a subset of
bash. 

``` js 
//help-me-please-god.js
var BASH = require('bash-vars')
console.log(BASH.stringify({
  foo: 4,
  bar: {
    baz: 'hello'
  }
}))
```

will output

```
foo=4
bar__baz=hello
```

and then access that in bash like this...


``` bash
# source the output of the node script...
# you have to output to a file, because BASH.
node help-me-please-god.js > config
. config
rm config

echo $foo
echo $bar__baz
```

## api

### stringify

convert js object into bash vars

### parse

convert bash vars back into a js object.

## License

MIT
