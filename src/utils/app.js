import Cookie from 'cookie_js';

const ADMIN_TOKEN = 'ADMIN_TOKEN';
const USERNAME = 'USERNAME';

export function getCookitWithToken() {
  return Cookie.get(ADMIN_TOKEN);
}

export function setCookitWithToken(token) {
  Cookie.set(ADMIN_TOKEN, token);
}

export function removeCookitWithToken() {
  Cookie.remove(ADMIN_TOKEN);
}

export function getCookitWithUsername() {
  return Cookie.get(USERNAME);
}

export function setCookitWithUsername(username) {
  Cookie.set(USERNAME, username);
}

export function removeCookitWithUsername() {
  Cookie.remove(USERNAME);
}
