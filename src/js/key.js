export default class Key {
  constructor(key, language, isSecondText) {
    this.key = key;
    this.language = language;
    this.isSecondText = isSecondText;
  }

  addDataAtribute(element) {
    Object.entries(this.key).forEach(([key, value]) => {
      element.setAttribute(`data-${key}`, value);
    });
  }

  addTextElement(content, modifier = false) {
    const text = document.createElement('span');
    const classModifier = modifier ? 'key__text_shiftKey' : 'key__text_key';
    text.innerText = content;
    text.classList.add('key__text', classModifier);
    return text;
  }

  render() {
    const key = document.createElement('div');
    key.classList.add('key');
    this.addDataAtribute(key);

    if (this.isSecondText) {
      const shiftKey = this.key[`shiftKey-${this.language}`];
      const secondText = this.addTextElement(shiftKey, true);
      key.append(secondText);
    }

    const dataText = this.key[`key-${this.language}`];
    const text = this.addTextElement(dataText);
    key.append(text);
    return key;
  }
}
