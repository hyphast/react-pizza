export function debounce(foo, ms) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      foo.apply(this, args)
    }, ms)
  }
}
