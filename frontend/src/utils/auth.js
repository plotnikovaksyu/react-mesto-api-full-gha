const BASE_URL = 'https://api.mesto15web.nomoredomains.rocks';

function checkRequest(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так =( Ошибка: ${res.status}`);
}

export function register( email, password ) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkRequest)
}

export function authorize( email, password ) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkRequest)
};

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkRequest)
}