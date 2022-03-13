export const set = <T, K extends keyof T>(
  record: T,
  property: K,
  value: T[K]
): T => ({
  ...record,
  [property]: value,
});

export const get = <T, K extends keyof T>(record: T, property: K): T[K] =>
  record[property];
