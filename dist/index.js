const i = (t) => t instanceof Int8Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array, u = (t) => t instanceof Int8Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray, f = (t) => t instanceof Int16Array || t instanceof Uint16Array, l = (t) => t instanceof Int32Array || t instanceof Uint32Array, y = (t) => t instanceof Float32Array || t instanceof Float64Array, g = (t) => t instanceof BigInt64Array || t instanceof BigUint64Array, c = (t) => i(t) || y(t) || g(t), A = (t) => Array.isArray(t) || c(t), m = (t) => typeof t == "string" || Array.isArray(t) || c(t), d = (t) => {
  if (u(t)) return 8;
  if (f(t)) return 16;
  if (l(t)) return 32;
  throw "given array doesn't belong to typed int arrays!";
}, p = (t, n = 10) => {
  if (t === 0) return 1;
  switch (n) {
    case 0:
    case 1:
    case 2:
      return Math.floor(Math.log2(t)) + 1;
    case 10:
      return Math.floor(Math.log10(t)) + 1;
    default:
      return Math.floor(Math.log(t) / Math.log(n)) + 1;
  }
}, h = (t, n, r) => {
  if (r > 10) return t;
  if (typeof t == "number")
    return t.toString(2).padStart(n, "0");
  if (Array.isArray(t) || i(t)) {
    const e = [];
    for (let o = 0; o < t.length; o++)
      e.push(h(t[o], n, r + 1));
    return e;
  }
  return t;
}, a = (t, n) => h(t, n, 0), w = (t, n) => t >> n << n, M = (t, n) => {
  if (t === n) return 0;
  for (t ^= n, n = 0; t > 0; )
    t % 2 && n++, t >>= 1;
  return n;
}, I = (t, n) => {
  const r = [];
  for (let e = 0; e < 11; e++) {
    const o = t ^ 1 << e;
    (t >> e) % 2 && o < n && r.push(o);
  }
  return r;
}, B = (t, n, r, e, o = 0) => {
  const s = r + e;
  return o < 0 ? n <<= -o : n >>= o, n %= 1 << r, (t >> s << s) + (n << e) + t % (1 << e);
}, _ = (t, n, r) => (t >> r) % (1 << n), U = (t) => (1 << t) - 1, G = (t) => a(t, 8), $ = {
  __2bin(t) {
    return t.map((n) => {
      const r = parseInt(n);
      return isNaN(r) ? n : a(r);
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
}, b = (t, n) => [
  t % n,
  Math.floor(t / n),
  n - t % n
], v = (t, ...n) => {
  const r = [];
  let e = 1;
  for (let o = 0; o < n.length; o++)
    r.push(t % n[o] * e), t = Math.floor(t / n[o]), e *= n[o];
  return r.push(t * e), r.reverse();
}, F = (t, ...n) => {
  const r = [];
  let e = 1;
  for (let o = 0; o < n.length; o++)
    r.push(t % n[o]), t = Math.floor(t / n[o]), e *= n[o];
  return r.push(t), r.reverse();
}, S = (t, n, r, e) => {
  if (!(n.length && r.length && n.length === r.length))
    throw "cases and values arguments are not arrays, have zero length or their lengths don't match!";
  for (let o = 0; o < n.length; o++)
    if (n[o] === t)
      return r[o];
  return e;
}, N = (t, n, r, e = !1, o) => {
  if (!(n.length && r.length && n.length === r.length + 1))
    throw "cases and values arguments are not arrays, have zero length or their lengths don't match!";
  if (e ? t <= n[0] : t < n[0])
    return o;
  for (let s = 1; s < n.length; s++)
    if (e ? t <= n[s] : t < n[s])
      return r[s - 1];
  return o;
}, z = (t) => {
  throw t;
}, O = (...t) => {
  let n = t[0], r = t[0];
  for (let e = 0; e < t.length; e++)
    t[e] < n && (n = t[e]), t[e] > r && (r = t[e]);
  return [n, r];
}, D = (t, n) => {
  const r = Math.random();
  if (t !== void 0) {
    if (typeof t == "number") {
      if (n !== void 0) {
        if (typeof n == "number")
          return r * (n - t) + t;
        throw `the second argument must be a number! Got: ${n}`;
      }
      return r * t;
    }
    throw `the second argument must be a number! Got: ${t}`;
  }
  return r;
}, E = (t, n, r) => {
  const e = Math.random();
  if (m(t)) {
    if (n !== void 0) {
      if (n < t.length - 1) {
        if (r !== void 0) {
          if (r < t.length - 1)
            return t[Math.floor(e * (r - n - 1) + n)];
          throw `the second argument must be a number! Got: ${r}`;
        }
        return t[Math.round(e * (n - 1))];
      }
      throw `the second argument must be a number! Got: ${n}`;
    }
    return t[Math.floor(e * (t.length - 1))];
  }
  throw `the first argument must be an array, typed array or string Got: ${t}!`;
}, T = (t, n, r) => {
  if (A(t.prototype)) {
    const e = new t(n);
    for (let o = 0; o < n; o++)
      e[o] = r(o, e);
    return e;
  }
  if (t === String) {
    let e = "";
    for (let o = 0; o < n; o++)
      e += r(o, e);
    return e;
  }
  throw `Only iterable class can be passed! Got: ${t}`;
};
export {
  T as Gen,
  a as b,
  G as b8,
  $ as binole,
  b as bitOffset,
  S as choose,
  N as chooseSlope,
  w as clearLastBits,
  v as destructByBase,
  p as digits,
  I as generateNearestValid,
  d as getIntArrayBase,
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
