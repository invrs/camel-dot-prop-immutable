import dot from "dot-prop-immutable"

function camelDotMatch({ obj, prop }) {
  let result

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
  if (Array.isArray(prop)) {
    prop = prop.map(p => p.replace(".", "\\."))
    prop = prop.join(".")
  }

  return camelStringCombos(prop)
}

function camelStringCombos(prop) {
  let regexes = [/[^\\]\.\w/, /[^\\]\.[^.]+$/]
  let combos = { [prop]: null }
  let ogProp = prop

  for (let regex of regexes) {
    prop = ogProp

    do {
      prop = prop.replace(
        regex,
        match =>
          match.charAt(0) +
          match.charAt(2).toUpperCase() +
          match.slice(3)
      )
      combos[prop] = null
    } while (prop.match(regex))
  }

  return Object.keys(combos)
}

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

export default {
  ...dot,
  camelCombos,
  camelDotMatch,
  delete: _delete,
  get,
  merge,
  set,
  toggle,
}
