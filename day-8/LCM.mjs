// 11309
//17621
//6043
//20777
//13939
//18673

const multiples = [11309, 17621, 16043, 20777, 13939, 18673];

const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const lcmAll = (ns) => ns.reduce(lcm, 1);
const rng = (lo, hi) => [...Array(hi - lo + 1)].map((_, i) => lo + i);

const lcmRng = (lo, hi) => lcmAll(rng(lo, hi));

console.log(lcmAll(multiples));
