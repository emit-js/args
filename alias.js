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
  dot.state.alias[prop.join(".")] = arg
  dot.any(prop, aliasArgs)
}

function aliasArgs(prop, arg, dot, eventId) {
  var id = [eventId].concat(prop).join("."),
    state = dot.state
  var alias = state.alias
  var parsed = state.parsedAlias

  if (!alias[id]) {
    return
  }

  if (!parsed[id]) {
    parsed[id] = parseAlias(alias[id])
  }

  var p = parsed[id]

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
