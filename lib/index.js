import dot from "dot-prop-immutable"

function get(obj, prop, value) {
  return dot.get(obj, prop, value)
}

export default { ...dot, get }
