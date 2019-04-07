/*prettier-ignore*/
"use strict"

module.exports = function(emit) {
  if (emit.args) {
    return
  }

  emit.state.args = {}

  emit.any("args", args)
}

function args(arg, prop, emit) {
  var event = prop[0]
  var state = emit.state.args

  state[event] = state[event] || {}

  var opts = state[event]

  Object.keys(arg).forEach(function(key) {
    opts[key] = opts[key] || {}
    Object.assign(opts[key], arg[key])

    var alias = opts[key].alias

    if (alias && !Array.isArray(alias)) {
      opts[key].alias = [alias]
    }
  })

  emit.any(event, aliasArgs)
}

function aliasArgs(arg, prop, emit, signal) {
  var args = emit.state.args[signal.event]

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
