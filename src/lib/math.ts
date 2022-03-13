export const random = (min = 0, max = 1): number =>
  Math.random() * (max - min) + min;
