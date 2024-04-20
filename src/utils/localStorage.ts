export const setLocalData = (name: string, data: string | Record<string, unknown>) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getLocalData = (name: string) =>
  JSON.parse(localStorage.getItem(name) || 'null');

export const removeLocalData = (name: string) => {
  localStorage.removeItem(name);
};