export const transformInputIntoSearchString = (value: string) => {
  return value.length > 0 ? value : '';
};
