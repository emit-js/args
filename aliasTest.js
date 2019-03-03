/* eslint-env jest */

var alias = require("./alias"),
  dot

beforeEach(function() {
  dot = require("dot-event")()
  alias(dot)
  dot.alias("test", { a: ["b"] })
  dot.alias("test2", { c: ["d"] })
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
