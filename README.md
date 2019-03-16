# @dot-event/args

[dot-event](https://github.com/dot-event/dot-event#readme) argument definitions

![args](args.gif)

## Usage

```js
var dot = require("dot-event")()
require("@dot-event/args")(dot)

dot("args", "myEvent", [
  [
    "myOption",
    "Description of myOption",
    { alias: "m", default: "default value" },
  ],
])

dot.any("myEvent", function(prop, arg) {
  expect(arg.myOption).toBe(true)
})

dot.myEvent({ m: true })
```

Always define args **before** defining the event.

## What this does

- Describes arguments
- Aliases arguments
- Sets default values
- Makes argument info accessible
