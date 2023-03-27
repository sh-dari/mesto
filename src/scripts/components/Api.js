export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getFetchAnswer(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`,
    {
      headers: this.headers
    })
    .then(res => this.getFetchAnswer(res));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`,
    {
      headers: this.headers
    })
    .then(res => this.getFetchAnswer(res));
  }

  updateUserInfo(formData) {
    return fetch(`${this.baseUrl}/users/me`,
    {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
    })
    .then(res => this.getFetchAnswer(res));
  }

  addNewCard(cardData) {
    return fetch(`${this.baseUrl}/cards`,
    {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(res => this.getFetchAnswer(res));
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`,
    {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => this.getFetchAnswer(res));
  }

  addLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`,
    {
      method: 'PUT',
      headers: this.headers
    })
    .then(res => this.getFetchAnswer(res));
  }

  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`,
    {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => this.getFetchAnswer(res));
  }

  changeAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`,
    {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => this.getFetchAnswer(res));
  }

  getDataToLoadPage() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }
}
