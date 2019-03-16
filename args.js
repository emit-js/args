/*prettier-ignore*/
"use strict"

module.exports = function(dot) {
  if (dot.args) {
    return
  }

  dot.state.args = {}

  dot.any("args", args)
}

function args(prop, arg, dot) {
  var event = prop[0]
  dot.state.args[event] = argEventState(arg)
  dot.any(event, aliasArgs)
}

function aliasArgs(prop, arg, dot, eventId, signal) {
  var args = dot.state.args[eventId]

  if (!args) {
    return
  }

  arg = arg || {}
  signal.arg = arg

  for (var key in args) {
    var opts = args[key]
    var keys = [key].concat(opts.alias).sort()
    var value = mergeAliasValues(arg, keys)

    if (value !== undefined || opts.default) {
      arg[key] = value === undefined ? opts.default : value
    }
  }
}

function argEventState(arg) {
  return arg.reduce(function(memo, arr) {
    var name = arr[0]
    var desc = arr[1]
    var opts = arr[2] || {}
    var alias = opts.alias

    if (alias) {
      opts.alias = Array.isArray(alias) ? alias : [alias]
    }

    memo[name] = Object.assign({ desc: desc }, opts)

    return memo
  }, {})
}

function mergeAliasValues(arg, keys) {
  return keys.reduce(function(memo, k) {
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
}
