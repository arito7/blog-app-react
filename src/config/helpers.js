import { API_ENDPOINT } from './constants';
import moment from 'moment';

const jwtKey = 'jwtKey';

export const signin = (username, password) => {
  const res = fetch(`${API_ENDPOINT}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  return res;
};

export const signup = (username, password, rpassword) => {
  const res = fetch(`${API_ENDPOINT}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, rpassword }),
  });

  return res;
};

export const saveJwtToLocal = (jwt) => {
  try {
    localStorage.setItem(jwtKey, jwt);
  } catch (error) {
    console.log(error.message);
  }
};

export const signout = () => {
  try {
    localStorage.removeItem(jwtKey);
  } catch (error) {
    console.log(error.message);
  }
};

export function getPost(postId) {
  const res = fetch(`${API_ENDPOINT}/posts/${postId}`);

  return res;
}

export function getComments(postId) {
  return fetch(`${API_ENDPOINT}/posts/${postId}/comments`);
}

export function formatDate(date) {
  return moment(date).format('MMM d, YYYY @ HH:mm');
}
