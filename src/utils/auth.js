const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error ${res.status}`);
  }
};
const signUp = ({ email, username, password }) => {
  return fetch(`${BASE_URL}/signUp`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  }).then(handleResponse);
};

const signIn = ({ email, password }) => {
  return fetch(`${BASE_URL}/signIn`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    });
};

const getUser = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(handleResponse)
    .then((data) => {
      localStorage.setItem('username', data.user.username);
      return data;
    });
};

const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(handleResponse);
};

const getArticles = (token) => {
  return fetch(`${BASE_URL}/articles`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(handleResponse);
};

const saveArticles = (data, token) => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      keyword: data.source.name,
      title: data.title,
      text: data.content,
      link: data.url,
      date: data.publishedAt,
      source: data.source.name,
      image: data.urlToImage,
    }),
  }).then(handleResponse);
};

const deleteArticle = (id, token) => {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(handleResponse);
};

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://news-explorer-api-7auj.onrender.com'
    : 'http://localhost:3000';

export {
  signIn,
  signUp,
  getUser,
  getUserInfo,
  getArticles,
  saveArticles,
  deleteArticle,
};
