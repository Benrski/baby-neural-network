export interface Link {
  id: string;
  input: number;
  weight: number;
}

export const newLink = (fields: Partial<Link> & Pick<Link, 'id'>): Link => ({
  input: 0,
  weight: 0,
  ...fields,
});

export const setId = (link: Link, id: string): Link => ({ ...link, id });

export const setInput = (link: Link, input: number): Link => ({
  ...link,
  input,
});

export const setWeight = (link: Link, weight: number): Link => ({
  ...link,
  weight,
});
