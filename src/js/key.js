export default class Key {
  constructor(key, language) {
    this.key = key;
    this.language = language;
  }

  addDataAtribute(element) {
    Object.entries(this.key).forEach(([key, value]) => {
      element.setAttribute(`data-${key}`, value);
    });
  }

  render() {
    const key = document.createElement('div');
    key.classList.add('key');
    this.addDataAtribute(key);
    const text = document.createElement('span');
    text.innerText = this.key[`key-${this.language}`];
    text.classList.add('key__text');
    key.append(text);
    return key;
  }
}
