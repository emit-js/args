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

Typically your [composer](https://github.com/dot-event/dot-event#composer-pattern) will add the [argument](https://github.com/dot-event/dot-event#emit-argument) aliases for the event it defines using `dot.state.alias`:

```js
export default function(dot) {
  if (dot.state.alias) {
    dot.state.alias.myEvent = {
      deploy: ["d", "de"],
    }
  }

  dot.any("myEvent", function({ d, de, deploy }) {
    // d, de, and deploy should have same value
  })
}
```
