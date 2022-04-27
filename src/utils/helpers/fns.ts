export const roundUp = (number: number) => {
  return +(Math.ceil(number * 100) / 100).toFixed(2);
};
