export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {about: this._info, name: this._name}
  }

  getUserId() {
    return this._id
  }

  setUserInfo(data) {
    this._info.textContent = data.about;
    this._name.textContent = data.name;
  }

  setUserAvatar(image) {
    this._avatar.src = image;
  }

  setUserId(id) {
    this._id = id;
  }
}
