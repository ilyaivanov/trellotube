export const getNextItem = <T>(
  array: T[],
  predicate: (item: T) => boolean
): T | undefined => {
  const index = array.findIndex(predicate);
  const nextItem = index + 1;
  return array[nextItem];
};

export const getPreviousItem = <T>(
  array: T[],
  predicate: (item: T) => boolean
): T | undefined => {
  if(!array)
    return undefined;
  const index = array.findIndex(predicate);
  const nextItem = index - 1;
  return array[nextItem];
};

export const append = <T>(array: T[], item: T): T[] => array.concat([item]);
export const prepend = <T>(array: T[], item: T): T[] => [item].concat(array);
