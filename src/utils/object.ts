export const set = <O, P extends keyof O>(
  object: O,
  property: P,
  value: O[P]
): O => ({
  ...object,
  [property]: value,
});

export const get = <O, P extends keyof O>(object: O, property: P): O[P] =>
  object[property];
