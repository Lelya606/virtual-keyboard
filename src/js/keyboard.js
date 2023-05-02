import Key from './key';

export default class Keyboard {
  constructor(data) {
    this.dataKeys = data;
    this.language = 'ru';
    this.indexTwoKey = 12;
    this.valueTextarea = '';
  }

  addActiveClass(code) {
    const keyElement = document.querySelector(`div[data-code=${code}]`);
    if (keyElement && !keyElement.classList.contains('js-active')) {
      keyElement.classList.add('js-active');
    }
  }

  removeActiveClass(code) {
    const keyElement = document.querySelector(`div[data-code=${code}].js-active`);
    keyElement && keyElement.classList.remove('js-active');
  }

  changeLanguage() {
    this.language = this.language === 'en' ? 'ru' : 'en';
    const keys = document.querySelectorAll('.key');
    console.log(keys);
    console.log(this.language);
    keys.forEach((key, index) => {
      const text = key.querySelector('.key__text');
      const newText = key.getAttribute(`data-key-${this.language}`);
      if (!newText || index <= this.indexTwoKey) return;
      text.innerText = newText;
    });
  }

  addKeys() {
    const content = document.createElement('div');
    content.classList.add('key-board__content');
    this.dataKeys.forEach((element, index) => {
      const key = new Key(
        element,
        this.language,
        index <= this.indexTwoKey
      ).render();
      content.append(key);
    });
    return content;
  }

  addKeyBoard() {
    const keyBoard = document.createElement('div');
    keyBoard.classList.add('key-board');
    const textarea = document.createElement('textarea');
    textarea.rows = 10;
    textarea.classList.add('key-board__textarea');
    const content = this.addKeys();
    keyBoard.append(textarea);
    keyBoard.append(content);
    const { body } = document;
    body.append(keyBoard);
  }
}
