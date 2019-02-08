/*prettier-ignore*/
"use strict"

module.exports = function(dot, opts) {
  if (dot.state.alias) {
    return
  }

  opts = opts || {}
  dot.state.alias = opts
  dot.state.parsedAlias = {}

  dot.any(alias)
}

function alias(prop, arg, dot, eventId) {
  var state = dot.state
  var alias = state.alias
  var parsed = state.parsedAlias

  if (!alias[eventId]) {
    return
  }

  if (!parsed[eventId]) {
    parsed[eventId] = parseAlias(alias[eventId])
  }

  var p = parsed[eventId]

  for (var key in arg) {
    if (!p[key]) {
      continue
    }

    p[key].forEach(function(k) {
      arg[k] = arg[k] || arg[key]
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
