import Key from './key';

export default class Keyboard {
  constructor(data) {
    this.dataKeys = data;
    this.language = 'en';
    this.indexTwoKey = 12;
    this.valueTextarea = '';
  }

  addActiveClass(key) {
    const keyElement = document.querySelector(`div[data-key-${this.language}=${key}]`);
    keyElement.classList.add('js-active');
  }

  removeActiveClass(key) {
    const keyElement = document.querySelector(`.js-active`);
    keyElement.classList.remove('js-active');
  }

  addKeys() {
    const classThis = this;
    const content = document.createElement('div');
    content.classList.add('key-board__content');
    this.dataKeys.forEach((element, index) => {
      const key = new Key(element, this.language, index <= this.indexTwoKey).render();
      key.addEventListener('click', (event) => {
        console.log(classThis);
        return console.log(event, 'event');
      });
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
