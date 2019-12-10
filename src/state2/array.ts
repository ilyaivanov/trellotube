export const insert = <T>(items: T[], index: number, item: T) => {
  const copy = [...items];
  copy.splice(index, 0, item);
  return copy;
};

export const remove = <T>(items: T[], index: number) => {
  const copy = [...items];
  copy.splice(index, 1);
  return copy;
};

export const contains = <T>(items: T[], value: T): boolean => {
  return items.indexOf(value) >= 0;
};
