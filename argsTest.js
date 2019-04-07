/* eslint-env jest */

var args = require("./"),
  emit

beforeEach(function() {
  emit = require("@emit-js/emit")()

  args(emit)

  emit.args("test", {
    a: {
      alias: "b",
    },
  })
  emit.args("test", {
    a: {
      default: true,
    },
  })
  emit.args("test2", {
    c: { alias: ["d"] },
  })
})

test("state", function() {
  expect(emit.state.args).toEqual({
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

  emit.any("test", function(arg) {
    expect(arg.a).toBe(1)
  })
  emit.any("test2", function(arg) {
    expect(arg.c).toBe(2)
  })

  emit.test({ a: 1 })
  emit.test2({ c: 2 })
})

test("alias args (array concat)", function() {
  expect.assertions(2)

  emit.any("test", function(arg) {
    expect(arg.a).toEqual([2, 1])
  })
  emit.any("test2", function(arg) {
    expect(arg.c).toEqual([4, 3])
  })

  emit.test({ a: [1], b: [2] })
  emit.test2({ c: [3], d: [4] })
})

test("alias args (default)", function() {
  expect.assertions(1)

  emit.any("test", function(arg) {
    expect(arg.a).toBe(true)
  })

  emit.test()
})
