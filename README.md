# @emit-js/args

[emit](https://github.com/emit-js/emit#readme) argument definitions

![args](args.gif)

## Usage

```js
var emit = require("@emit-js/emit")()
require("@emit-js/args")(emit)

emit("args", "myEvent", {
  myOption: { alias: "m", default: "default value" },
})

emit.any("myEvent", function(arg, prop) {
  expect(arg.myOption).toBe(true)
})

emit.myEvent({ m: true })
```

Always define args **before** defining the event.

## What this does

- Describes arguments
- Aliases arguments
- Sets default values
- Makes argument info accessible
