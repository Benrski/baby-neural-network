export const set = <T, K extends keyof T>(
  object: T,
  property: K,
  value: T[K]
): T => ({
  ...object,
  [property]: value,
});

export const get = <T, K extends keyof T>(object: T, property: K): T[K] =>
  object[property];
