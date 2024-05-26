export const formatToLocalDate = (date: string) => {
  const localDate = new Date(date).toLocaleString();
  return localDate;
};
