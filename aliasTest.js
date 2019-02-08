/* eslint-env jest */

var alias = require("./alias"),
  dot = require("dot-event")()

beforeEach(function() {
  dot.reset()
  alias(dot, { test: { a: ["b"] } })
})

test("alias args", function() {
  expect.assertions(1)
  dot.any("test", function(prop, arg) {
    expect(arg.b).toBe(true)
  })
  dot.test({ a: true })
})
