/* eslint-env jest */

var alias = require("./alias"),
  dot = require("dot-event")()

beforeEach(function() {
  dot.reset()
  alias(dot, { test: { a: ["b"] } })
  alias(dot, { test2: { c: ["d"] } })
})

test("alias args", function() {
  expect.assertions(2)
  dot.any("test", function(prop, arg) {
    expect(arg.b).toBe(true)
  })
  dot.any("test2", function(prop, arg) {
    expect(arg.d).toBe(true)
  })
  dot.test({ a: true })
  dot.test2({ c: true })
})
