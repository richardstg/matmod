export function regressionFunc(x, y) {
  const pairs = x.map((item, index) => {
    return { x: parseFloat(item), y: parseFloat(y[index]) };
  });

  const pairsAmount = pairs.length;

  const sum = pairs.reduce(
    (acc, pair) => ({
      x: acc.x + pair.x,
      y: acc.y + pair.y,
    }),
    { x: 0, y: 0 }
  );

  const average = {
    x: sum.x / pairsAmount,
    y: sum.y / pairsAmount,
  };

  const slopeDividend = pairs.reduce(
    (acc, pair) => acc + (pair.x - average.x) * (pair.y - average.y),
    0
  );
  const slopeDivisor = pairs.reduce(
    (acc, pair) => acc + (pair.x - average.x) ** 2,
    0
  );

  const b = slopeDivisor !== 0 ? slopeDividend / slopeDivisor : 0;
  const a = -(b * average.x) + average.y;
  const n = pairsAmount;

  const SST = pairs.reduce((acc, pair) => acc + (pair.y - average.y) ** 2, 0);
  const SSR = b * slopeDividend;
  const SSE = SST - SSR;
  const MSE = SSE / (n - 2);

  const sA = Math.sqrt(MSE * (1 / n + average.x ** 2 / slopeDivisor));
  const sB = Math.sqrt(MSE / slopeDivisor);

  // stickprovet n > 30 ger t=1.96
  const t = 1.96;

  const confInt = (x) => {
    return t * Math.sqrt(MSE * (1 / n + (x - average.x) ** 2 / slopeDivisor));
  };

  const aUpper = a + t * sA;
  const aLower = a - t * sA;
  const bUpper = b + t * sB;
  const bLower = b - t * sB;

  return [aLower, aUpper, bLower, bUpper, confInt];
}
