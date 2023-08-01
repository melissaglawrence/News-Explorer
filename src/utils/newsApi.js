class Api {
  constructor(baseUrl, date, weekDate) {
    this._baseUrl = baseUrl;
    this._date = date;
    this._weekDate = weekDate;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  };

  getNews(search) {
    return fetch(
      `${this._baseUrl}?q=${search}&from=${this._weekDate}&to=${this._date}&pageSize=100&apiKey=10843cf53af34ee3915b31771b196357`,
      {
        headers: {
          Authorization: '10843cf53af34ee3915b31771b196357',
          'Content-Type': 'application/json',
        },
      },
    ).then(this._handleResponse);
  }
}

const BASE_URL = 'https://news-explorer-api-7auj.onrender.com';

const d = new Date();
const newDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
const weekDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate() - 7}`;

const api = new Api(BASE_URL, newDate, weekDate);

export default api;
