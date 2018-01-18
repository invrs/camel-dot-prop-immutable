import dot from "dot-prop-immutable"

function get(obj, prop, value) {
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

  return (result || value)
}

export default { ...dot, get }
