/*prettier-ignore*/
"use strict"

module.exports = function(dot) {
  if (dot.alias) {
    return
  }

  dot.state.alias = {}

  dot.any("alias", alias)
}

function alias(prop, arg, dot) {
  dot.state.alias[prop[0]] = arg
  dot.any(prop[0], aliasArgs)
}

function aliasArgs(prop, arg, dot, eventId) {
  var state = dot.state
  var alias = state.alias

  if (!alias[eventId]) {
    return
  }

  var eventAlias = alias[eventId]

  for (var key in eventAlias) {
    if (!eventAlias[key]) {
      continue
    }

    var keys = eventAlias[key].concat([key]).sort()

    var value = keys.reduce(function(memo, k) {
      if (Array.isArray(arg[k])) {
        memo = !memo || Array.isArray(memo) ? memo : [memo]
        return arg[k].concat(memo || [])
      } else if (typeof arg[k] === "object") {
        return Object.assign(memo || {}, arg[k])
      } else if (arg[k]) {
        return arg[k]
      } else {
        return memo
      }
    }, undefined)

    keys.forEach(function(k) {
      arg[k] = value
    })
  }
}
