/* eslint-env jest */

var args = require("./"),
  dot

beforeEach(function() {
  dot = require("dot-event")()

  args(dot)

  dot.args("test", {
    arg: [["a", "This is a description", { alias: "b" }]],
  })
  dot.args("test2", {
    arg: [["c", "This is c description", { alias: ["d"] }]],
  })
})

test("state", function() {
  expect(dot.state.args).toEqual({
    test: {
      a: {
        alias: ["b"],
        desc: "This is a description",
      },
    },
    test2: {
      c: {
        alias: ["d"],
        desc: "This is c description",
      },
    },
  })
})

test("alias args", function() {
  expect.assertions(4)

  dot.any("test", function(prop, arg) {
    expect(arg.a).toBe(1)
    expect(arg.b).toBe(1)
  })
  dot.any("test2", function(prop, arg) {
    expect(arg.c).toBe(2)
    expect(arg.d).toBe(2)
  })

  dot.test({ a: 1 })
  dot.test2({ c: 2 })
})

test("alias args (array concat)", function() {
  expect.assertions(4)

  dot.any("test", function(prop, arg) {
    expect(arg.a).toEqual([2, 1])
    expect(arg.b).toEqual([2, 1])
  })
  dot.any("test2", function(prop, arg) {
    expect(arg.c).toEqual([4, 3])
    expect(arg.d).toEqual([4, 3])
  })

  dot.test({ a: [1], b: [2] })
  dot.test2({ c: [3], d: [4] })
})
