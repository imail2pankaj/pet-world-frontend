const tokenName = 'accessToken';

export const getToken = () => {
  return localStorage.getItem(tokenName);
}

export const setToken = (tokenValue) => {
  return localStorage.setItem(tokenName, tokenValue);
}

export const removeToken = () => {
  return localStorage.removeItem(tokenName);
}