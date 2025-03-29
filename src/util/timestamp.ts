const timestampRe = /(\d{2}):(\d{2}):(\d{2})\.(\d{3})/;

export const parseSubtitleTimestamp = (ts: string) => {
  const result = ts.match(timestampRe);
  if (!result) throw new Error("Invalid timestamp format");

  const [, _h, _m, _s, _ms] = result;

  const h = parseInt(_h, 10);
  const m = parseInt(_m, 10) + h * 60;
  const s = parseInt(_s, 10) + m * 60;
  const ms = parseInt(_ms, 10) + s * 1000;

  return ms;
};

export const roundToMultiple = (n: number, multiple: number) =>
  Math.round(n / multiple) * multiple;

export const range = (from: number, to: number, step: number) => {
  const arr: number[] = [];
  for (let current = from; current <= to; current += step) {
    arr.push(current);
  }
  return arr;
};

export const printWithDecimalPlaces = (
  n: number,
  decimals: number,
  decimalPlaces: number,
) => {
  const nStr = (n | 0).toString(10).padStart(decimals + 1, "0");
  const integerPart = nStr.slice(0, -decimals);
  const decimalPart = nStr.slice(-decimals);

  return `${integerPart}.${decimalPart.slice(0, decimalPlaces - decimals)}`;
};
