export function debounce(foo: Function, ms: number) {
  let timer: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      foo.apply(this, args)
    }, ms)
  }
}
