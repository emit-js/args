/*prettier-ignore*/
"use strict"

module.exports = function(dot) {
  if (dot.args) {
    return
  }

  dot.state.args = {
    aliases: {},
    descriptions: {},
  }

  dot.any("args", args)
}

function args(prop, arg, dot) {
  var event = prop[0]

  extractDesc(prop, arg, dot)
  dot.state.args.aliases[event] = arg

  dot.any(event, aliasArgs)
}

function aliasArgs(prop, arg, dot, eventId) {
  var aliases = dot.state.args.aliases

  if (!aliases[eventId]) {
    return
  }

  var alias = aliases[eventId]

  for (var key in alias) {
    if (!alias[key]) {
      continue
    }

    var keys = alias[key].concat([key]).sort()

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

    if (value !== undefined) {
      keys.forEach(function(k) {
        arg[k] = value
      })
    }
  }
}

function extractDesc(prop, arg, dot) {
  var desc,
    event = prop[0]

  for (var key in arg) {
    var alias = arg[key]

    if (alias[alias.length - 1].match(/\s/)) {
      desc = alias.pop()
    }

    if (desc) {
      var argsDesc = dot.state.args.descriptions
      argsDesc[event] = argsDesc[event] || {}
      argsDesc[event][key] = desc
    }
  }
}
