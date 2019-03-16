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
```

Call `dot.args` **before** defining the event.

## What this does

- Describes arguments
- Aliases arguments
- Sets default values
- Makes argument info accessible
