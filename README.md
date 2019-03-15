# @dot-event/args

[dot-event](https://github.com/dot-event/dot-event#readme) argument definitions

![args](args.gif)

## Why

Aside from aliasing arguments, `dot.args` makes argument information observable.

## Usage

```js
var dot = require("dot-event")()
require("@dot-event/args")(dot)

dot("args", "myEvent", {
  o: ["opt", "opts", "This is a description"],
})

dot.any("myEvent", function(prop, { o, opt, opts }) {
  // o, opt, and opts should have same value
})
```

Call `dot.args` **before** defining the event.
