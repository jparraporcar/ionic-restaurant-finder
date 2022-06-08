export const ratingHelper = (value: number) => {
  const intR = Math.floor(value);
  const ratingBool: boolean[] = new Array(5).fill(false);
  for (let i = 0, max = intR - 1; i <= max; i++) {
    ratingBool[i] = true;
  }
  return ratingBool;
};
