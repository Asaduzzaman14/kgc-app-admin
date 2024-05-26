export const getKgcAdminToken = () => {
  const token = localStorage.getItem('kgc');

  return token;
};

export const setKgcAdminToken = (token: string) => {
  localStorage.setItem('kgc', token);
};

export const removeKgcAdminToken = () => {
  localStorage.removeItem('kgc');
};
