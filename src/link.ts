export interface Link {
  input: number;
  weight: number;
}

export const newLink = (fields: Partial<Link>): Link => ({
  input: 0,
  weight: 0,
  ...fields,
});

export const setInput = (link: Link, input: number): Link => ({
  ...link,
  input,
});

export const setWeight = (link: Link, weight: number): Link => ({
  ...link,
  weight,
});
