import dot from "dot-prop-immutable"

function get(obj, prop, value) {
  let match = camelDotMatch({ obj, prop })
  return match.result || value
}

function set(obj, prop, value) {
  let match = camelDotMatch({ obj, prop })
  return dot.set(obj, match.prop, value)
}

function _delete(obj, prop) {
  let match = camelDotMatch({ obj, prop })
  return dot.delete(obj, match.prop)
}

function toggle(obj, prop) {
  let match = camelDotMatch({ obj, prop })
  return dot.toggle(obj, match.prop)
}

function merge(obj, prop, value) {
  let match = camelDotMatch({ obj, prop })
  return dot.merge(obj, match.prop, value)
}

function camelDotMatch({ obj, prop }) {
  let result = dot.get(obj, prop)

  if (result) {
    return { prop, result }
  }

  for (let combo of camelCombos(prop)) {
    result = dot.get(obj, combo)

    if (result) {
      prop = combo
      break
    }
  }

  return { prop, result }
}

function camelCombos(prop) {
  let regexes = [/\.\w/, /\.[^.]+$/]
  let combos = {}
  let ogProp = prop

  for (let regex of regexes) {
    prop = ogProp

    do {
      prop = prop.replace(
        regex,
        match =>
          match.charAt(1).toUpperCase() + match.slice(2)
      )
      combos[prop] = null
    } while (prop.match(regex))
  }

  return Object.keys(combos)
}

module.exports = {
  ...dot,
  camelCombos,
  camelDotMatch,
  delete: _delete,
  get,
  merge,
  set,
  toggle,
}
