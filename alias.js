/*prettier-ignore*/
"use strict"

module.exports = function(dot, opts) {
  var state = dot.state

  if (state.alias) {
    return
  }

  state.alias = opts || {}
  state.parsedAlias = {}

  dot.any("alias", alias)
}

function alias(prop, arg, dot) {
  dot.state.alias[prop[0]] = arg
  dot.any(prop, aliasArgs)
}

function aliasArgs(prop, arg, dot, eventId) {
  var state = dot.state
  var alias = state.alias
  var parsed = state.parsedAlias

  if (!alias[eventId]) {
    return
  }

  if (!parsed[eventId]) {
    parsed[eventId] = parseAlias(alias[eventId])
  }

  var argCopy = Object.assign({}, arg),
    p = parsed[eventId]

  for (var key in arg) {
    if (!p[key]) {
      continue
    }

    var keys = p[key].concat([key]).sort()

    var value = keys.reduce(function(memo, k) {
      if (Array.isArray(argCopy[k])) {
        memo = !memo || Array.isArray(memo) ? memo : [memo]
        return argCopy[k].concat(memo || [])
      } else if (typeof argCopy[k] === "object") {
        return Object.assign(memo || {}, argCopy[k])
      } else if (argCopy[k]) {
        return argCopy[k]
      } else {
        return memo
      }
    }, undefined)

    keys.forEach(function(k) {
      arg[k] = value
    })
  }
}

function parseAlias(aliases) {
  var alias,
    any,
    i,
    k,
    key,
    len,
    out = {},
    prev

  for (key in aliases) {
    any = aliases[key]
    alias = out[key] = Array.isArray(any) ? any : [any]

    for (i = 0, len = alias.length; i < len; i++) {
      prev = out[alias[i]] = [key]

      for (k = 0; k < len; k++) {
        if (i !== k) {
          prev.push(alias[k])
        }
      }
    }
  }

  return out
}
