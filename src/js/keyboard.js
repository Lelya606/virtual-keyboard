import Key from './key';

export default class Keyboard {
  constructor(data) {
    this.dataKeys = data;
    this.language = 'ru';
    this.indexTwoKey = 12;
    this.textarea = null;
    this.textareaRows = 10;
  }

  addFocusTextarea() {
    this.textarea.focus();
  }

  changePositionCursor(code) {
    const change = {
      ArrowLeft: this.textarea.selectionStart - 1,
      ArrowRight: this.textarea.selectionStart + 1,
      ArrowDown: this.textarea.value.length,
      ArrowUp: 0,
    };

    this.textarea.selectionStart = this.textarea.selectionEnd = change[code];
  }

  addActiveClass(code) {
    const keyElement = document.querySelector(`div[data-code=${code}]`);
    this.textarea.focus();
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

    keys.forEach((key) => {
      const text = key.querySelector('.key__text_key');
      const newText = key.getAttribute(`data-key-${this.language}`);
      if (!newText) return;
      text.innerText = newText;
    });
  }

  inputValue(value) {
    this.textarea.value += value;
  }

  addKeys() {
    const content = document.createElement('div');
    content.classList.add('key-board__content');
    this.dataKeys.forEach((element, index) => {
      const key = new Key(
        element,
        this.language,
        index <= this.indexTwoKey,
      ).render();
      content.append(key);
    });
    return content;
  }

  addTextarea() {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('autofocus', true);
    textarea.rows = this.textareaRows;
    textarea.classList.add('key-board__textarea');
    this.textarea = textarea;
    return textarea;
  }

  addKeyBoard() {
    const keyBoard = document.createElement('div');
    keyBoard.classList.add('key-board');
    const textarea = this.addTextarea();
    const content = this.addKeys();
    keyBoard.append(textarea);
    keyBoard.append(content);
    const helpBlock = document.createElement('div');
    helpBlock.innerText = 'Change language: Shift + Alt';
    helpBlock.classList = 'key-board__help';
    keyBoard.append(helpBlock);
    const { body } = document;
    body.append(keyBoard);
  }
}
