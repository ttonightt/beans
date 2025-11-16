const i = (t) => t instanceof Int8Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array, u = (t) => t instanceof Int8Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray, f = (t) => t instanceof Int16Array || t instanceof Uint16Array, l = (t) => t instanceof Int32Array || t instanceof Uint32Array, y = (t) => t instanceof Float32Array || t instanceof Float64Array, g = (t) => t instanceof BigInt64Array || t instanceof BigUint64Array, c = (t) => i(t) || y(t) || g(t), A = (t) => Array.isArray(t) || c(t), m = (t) => typeof t == "string" || Array.isArray(t) || c(t), p = (t) => {
  if (u(t)) return 8;
  if (f(t)) return 16;
  if (l(t)) return 32;
  throw "given array doesn't belong to typed int arrays!";
}, d = (t, r = 10) => {
  if (t === 0) return 1;
  switch (r) {
    case 0:
    case 1:
    case 2:
      return Math.floor(Math.log2(t)) + 1;
    case 10:
      return Math.floor(Math.log10(t)) + 1;
    default:
      return Math.floor(Math.log(t) / Math.log(r)) + 1;
  }
}, h = (t, r, n) => {
  if (n > 10) return t;
  if (typeof t == "number")
    return t.toString(2).padStart(r, "0");
  if (Array.isArray(t) || i(t)) {
    const o = [];
    for (let e = 0; e < t.length; e++)
      o.push(h(t[e], r, n + 1));
    return o;
  }
  return t;
}, a = (t, r) => h(t, r, 0), w = (t, r) => t >> r << r, M = (t, r) => {
  if (t === r) return 0;
  for (t ^= r, r = 0; t > 0; )
    t % 2 && r++, t >>= 1;
  return r;
}, I = (t, r) => {
  const n = [];
  for (let o = 0; o < 11; o++) {
    const e = t ^ 1 << o;
    (t >> o) % 2 && e < r && n.push(e);
  }
  return n;
}, B = (t, r, n, o, e = 0) => {
  const s = n + o;
  return e < 0 ? r <<= -e : r >>= e, r %= 1 << n, (t >> s << s) + (r << o) + t % (1 << o);
}, _ = (t, r, n) => (t >> n) % (1 << r), U = (t) => (1 << t) - 1, v = (t) => a(t, 8), G = {
  __2bin(t) {
    return t.map((r) => {
      const n = parseInt(r);
      return isNaN(n) ? r : a(n);
    });
  },
  log(...t) {
    return console.log(...this.__2bin(t));
  },
  error(...t) {
    return console.error(...this.__2bin(t));
  },
  warn(...t) {
    return console.warn(...this.__2bin(t));
  }
}, $ = (t, r) => [
  t % r,
  Math.floor(t / r),
  r - t % r
], b = (t, ...r) => {
  const n = [];
  let o = 1;
  for (let e = 0; e < r.length; e++)
    n.push(t % r[e] * o), t = Math.floor(t / r[e]), o *= r[e];
  return n.push(t * o), n.reverse();
}, F = (t, ...r) => {
  const n = [];
  let o = 1;
  for (let e = 0; e < r.length; e++)
    n.push(t % r[e]), t = Math.floor(t / r[e]), o *= r[e];
  return n.push(t), n.reverse();
}, S = (t, r, n, o) => {
  if (!(r.length && n.length && r.length === n.length))
    throw "cases and values arguments are not arrays, have zero length or their lengths don't match!";
  for (let e = 0; e < r.length; e++)
    if (r[e] === t)
      return n[e];
  return o;
}, N = (t, r, n, o = !1, e) => {
  if (!(r.length && n.length && r.length === n.length + 1))
    throw "cases and values arguments are not arrays, have zero length or their lengths don't match!";
  if (o ? t <= r[0] : t < r[0])
    return e;
  for (let s = 1; s < r.length; s++)
    if (o ? t <= r[s] : t < r[s])
      return n[s - 1];
  return e;
}, z = (t) => {
  throw t;
}, O = (...t) => {
  let r = t[0], n = t[0];
  for (let o = 0; o < t.length; o++)
    t[o] < r && (r = t[o]), t[o] > n && (n = t[o]);
  return [r, n];
}, D = (t, r) => {
  const n = Math.random();
  if (t !== void 0) {
    if (typeof t == "number") {
      if (r !== void 0) {
        if (typeof r == "number")
          return n * (r - t) + t;
        throw `the second argument must be a number! Got: ${r}`;
      }
      return n * t;
    }
    throw `the second argument must be a number! Got: ${t}`;
  }
  return n;
}, E = (t, r, n) => {
  const o = Math.random();
  if (m(t)) {
    if (r !== void 0) {
      if (r < t.length - 1) {
        if (n !== void 0) {
          if (n < t.length - 1)
            return t[Math.floor(o * (n - r - 1) + r)];
          throw `the second argument must be a number! Got: ${n}`;
        }
        return t[Math.round(o * (r - 1))];
      }
      throw `the second argument must be a number! Got: ${r}`;
    }
    return t[Math.floor(o * (t.length - 1))];
  }
  throw `the first argument must be an array, typed array or string Got: ${t}!`;
}, T = (t, r, n) => {
  if (A(t.prototype)) {
    const o = new t(r);
    for (let e = 0; e < r; e++)
      o[e] = n(e, o);
    return o;
  }
  if (t === String) {
    let o = "";
    for (let e = 0; e < r; e++)
      o += n(e, o);
    return o;
  }
  throw `Only iterable class can be passed! Got: ${t}`;
};
export {
  T as Gen,
  a as b,
  v as b8,
  G as binole,
  $ as bitOffset,
  S as choose,
  N as chooseSlope,
  w as clearLastBits,
  b as destructByBase,
  d as digits,
  I as generateNearestValid,
  p as getIntArrayBase,
  M as hammingDistance,
  A as isAnyArray,
  g as isBigIntArray,
  y as isFloatArray,
  f as isInt16Array,
  l as isInt32Array,
  u as isInt8Array,
  i as isIntArray,
  m as isIterable,
  c as isTypedArray,
  O as minmax,
  U as ones,
  B as putBits,
  D as rand,
  E as randFrom,
  _ as sliceBits,
  F as splitByBase,
  z as throwError
};
