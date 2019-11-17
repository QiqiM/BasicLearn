let a = {
    "m":120,
    "n":100
}

let b = a
console.log(b.m)
console.log(b.n)
console.log(a.m)
console.log(a.n)

console.log("=================")
// b.n = 200
// console.log(b.n)
// console.log(a.n)

let c = {
    "m":120,
    "n":100
}

b = c
b.n = 200
console.log(b.n)
console.log(a.n)
console.log(c.n)
