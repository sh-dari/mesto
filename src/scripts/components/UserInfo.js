export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {link: this._info, name: this._name}
  }

  setUserInfo(data) {
    this._info.textContent = data.link;
    this._name.textContent = data.name;
  }
}
