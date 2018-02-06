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
  return (
    tryCombos({ dir: "right", obj, prop }) ||
    tryCombos({ dir: "left", obj, prop }) || { prop }
  )
}

function tryCombos({ obj, prop, dir = "left" }) {
  let result = dot.get(obj, prop)
  let regex

  if (dir == "left") {
    regex = /\.\w/
  } else {
    regex = /\.[^.]+$/
  }

  if (!result && prop.constructor === String) {
    let lastProp
    do {
      lastProp = prop
      prop = prop.replace(
        regex,
        match =>
          match.charAt(1).toUpperCase() + match.slice(2)
      )
      result = dot.get(obj, prop)
    } while (!result && lastProp != prop)
  }

  if (result !== undefined) {
    return { prop, result }
  }
}

module.exports = {
  ...dot,
  camelDotMatch,
  delete: _delete,
  get,
  merge,
  set,
  toggle,
}
