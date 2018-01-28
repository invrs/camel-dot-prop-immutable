import dot from "dot-prop-immutable"

function get(obj, prop, value) {
  let match = getCamel({ obj, prop })
  return match.result || value
}

function set(obj, prop, value) {
  let match = getCamel({ obj, prop })
  return dot.set(obj, match.prop, value)
}

function _delete(obj, prop) {
  let match = getCamel({ obj, prop })
  return dot.delete(obj, match.prop)
}

function toggle(obj, prop) {
  let match = getCamel({ obj, prop })
  return dot.toggle(obj, match.prop)
}

function merge(obj, prop, value) {
  let match = getCamel({ obj, prop })
  return dot.merge(obj, match.prop, value)
}

function getCamel({ obj, prop }) {
  let ogProp = prop
  let result = dot.get(obj, prop)

  if (!result && prop.constructor === String) {
    let lastProp
    do {
      lastProp = prop
      prop = prop.replace(/\.\w/, match =>
        match.charAt(1).toUpperCase()
      )
      result = dot.get(obj, prop)
    } while (!result && lastProp != prop)
  }

  if (result === undefined) {
    prop = ogProp
  }

  return { prop, result }
}

module.exports = {
  ...dot,
  delete: _delete,
  get,
  merge,
  set,
  toggle,
}
