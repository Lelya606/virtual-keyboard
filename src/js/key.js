export default class Key {
  constructor(key) {
    this.key = key;
    this.language = 'en';
  }

  render() {
    const key = document.createElement('div');
    key.classList.add('key');
    const text = document.createElement('span');
    text.innerText = this.key[`key-${this.language}`];
    text.classList.add('key__text');
    key.append(text);
    return key;
  }
}
