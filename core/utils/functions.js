const tokenName = 'accessToken';

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(tokenName);
  }
}

export const setToken = (tokenValue) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(tokenName, tokenValue);
  }
}

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(tokenName);
  }
}