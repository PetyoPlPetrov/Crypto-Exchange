export const sortByNameAndPrice = (ascending: boolean) => (a: any, b: any) => {
  return ascending
    ? parseFloat(a.value) - parseFloat(b.value)
    : parseFloat(b.value) - parseFloat(a.value);
};
