const API_ENDPOINT = 'https://arito-blog-api.herokuapp.com';

const jwtKey: string = 'jwtKey';

const Authorization: string = `Bearer ${getToken()}`;

export const signin = (
  username: string,
  password: string
): Promise<Response> => {
  const res = fetch(`${API_ENDPOINT}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  return res;
};

export const signup = (
  username: string,
  password: string,
  rpassword: string
): Promise<Response> => {
  const res = fetch(`${API_ENDPOINT}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, rpassword }),
  });

  return res;
};

export const getPosts = (): Promise<Response> => {
  return fetch(`${API_ENDPOINT}/posts`);
};

export const saveJwtToLocal = (jwt: string): void => {
  try {
    localStorage.setItem(jwtKey, jwt);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const signout = () => {
  try {
    localStorage.removeItem(jwtKey);
  } catch (error: any) {
    console.log(error.message);
  }
};

export function getPost(postId: string): Promise<Response> {
  const res = fetch(`${API_ENDPOINT}/posts/${postId}`);

  return res;
}

export function getUserPosts(userId: string): Promise<Response> {
  const res = fetch(`${API_ENDPOINT}/users/posts`, {
    headers: {
      Authorization,
    },
  });

  return res;
}

function getToken(): string | null {
  return localStorage.getItem(jwtKey);
}

export function createPost(
  title: string,
  body: string,
  publish: boolean = false
): Promise<Response> {
  return fetch(`${API_ENDPOINT}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
    body: JSON.stringify({ title, body, published: publish }),
  });
}

export function postComment(
  postId: string,
  name: string,
  comment: string
): Promise<Response> {
  return fetch(`${API_ENDPOINT}/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, comment }),
  });
}

export function getComments(postId: string): Promise<Response> {
  return fetch(`${API_ENDPOINT}/posts/${postId}/comments`);
}

export function updatePost(
  postId: string,
  title: string | null = null,
  body: string | null = null,
  published: boolean | null = null
): Promise<Response> {
  return fetch(`${API_ENDPOINT}/posts/${postId}`, {
    method: 'put',
    headers: { Authorization, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      body,
      published,
    }),
  });
}

export function deletePost(postId: string): Promise<Response> {
  return fetch(`${API_ENDPOINT}/posts/${postId}`, {
    method: 'delete',
    headers: {
      Authorization,
    },
  });
}

export function getUserPublicPosts(userId: string): Promise<Response> {
  return fetch(`${API_ENDPOINT}/users/${userId}/posts`);
}
