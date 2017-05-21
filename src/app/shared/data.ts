function _range(start: number, end: number, step: number): number[] {
    return Array.apply({}, Array(Math.floor((end - start) / step))).map((_, i) => start + i * step)
}
export function range(a: number, b = undefined, c = undefined) {
    if (b === undefined && c === undefined) {
        return _range(0, a, 1)
    } else {
        return _range(a, b, c || 1)
    }
}
export function randomInt(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min))
}
export function randomString(length: number) {
    return String.fromCharCode.apply(null, range(length).map(() => randomInt('a'.charCodeAt(0), 'z'.charCodeAt(0)+1)))
}