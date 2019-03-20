/* eslint-env jest */

var args = require("./"),
  dot

beforeEach(function() {
  dot = require("dot-event")()

  args(dot)

  dot.args("test", {
    a: {
      alias: "b",
    },
  })
  dot.args("test", {
    a: {
      default: true,
    },
  })
  dot.args("test2", {
    c: { alias: ["d"] },
  })
})

test("state", function() {
  expect(dot.state.args).toEqual({
    test: {
      a: {
        alias: ["b"],
        default: true,
      },
    },
    test2: {
      c: {
        alias: ["d"],
      },
    },
  })
})

test("alias args", function() {
  expect.assertions(2)

  dot.any("test", function(prop, arg) {
    expect(arg.a).toBe(1)
  })
  dot.any("test2", function(prop, arg) {
    expect(arg.c).toBe(2)
  })

  dot.test({ a: 1 })
  dot.test2({ c: 2 })
})

test("alias args (array concat)", function() {
  expect.assertions(2)

  dot.any("test", function(prop, arg) {
    expect(arg.a).toEqual([2, 1])
  })
  dot.any("test2", function(prop, arg) {
    expect(arg.c).toEqual([4, 3])
  })

  dot.test({ a: [1], b: [2] })
  dot.test2({ c: [3], d: [4] })
})

test("alias args (default)", function() {
  expect.assertions(1)

  dot.any("test", function(prop, arg) {
    expect(arg.a).toBe(true)
  })

  dot.test()
})
