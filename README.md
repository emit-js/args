# @dot-event/alias

[dot-event](https://github.com/dot-event/dot-event#readme) [argument](https://github.com/dot-event/dot-event#emit-argument) aliases

![alias](alias.gif)

## Install

```bash
npm install dot-event @dot-event/alias
```

## Setup

```js
const dot = require("dot-event")()
require("@dot-event/alias")(dot)
```

## Usage

Add [argument](https://github.com/dot-event/dot-event#emit-argument) aliases using `dot.alias`:

```js
export default function(dot) {
  dot.alias("myEvent", {
    deploy: ["d", "de"],
  })

  dot.any("myEvent", function(prop, { d, de, deploy }) {
    // d, de, and deploy should have same value
  })
}
```

Always call `dot.alias` **before** defining the event, never after.
