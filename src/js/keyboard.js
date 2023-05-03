import Key from './key';

export default class Keyboard {
  constructor(data) {
    this.dataKeys = data;
    this.language = 'ru';
    this.indexTwoKey = 12;
    this.textarea = null;
    this.textareaRows = 8;
    this.keys = null;
    this.capsLk = false;
  }

  deleteLetter(code) {
    const { value, selectionStart, selectionEnd } = this.textarea;
    console.log(selectionStart, selectionEnd);
    if (selectionStart !== selectionEnd) {
      const startString = value.substring(0, selectionStart);
      const endString = value.substring(selectionEnd);
      this.textarea.value = startString + endString;
      return this.textarea.selectionStart = this.textarea.selectionEnd = selectionStart;
    }

    if (code === 'Backspace') {
      const startString = value.substring(0, selectionStart - 1);
      const endString = value.substring(selectionStart, value.length);
      return this.textarea.value = startString + endString;
    }
    if (code === 'Delete') {
      const startString = value.substring(0, selectionStart);
      const endString = value.substring(selectionStart + 1, value.length);
      this.textarea.value = startString + endString;
      return this.textarea.selectionStart = this.textarea.selectionEnd = selectionStart;
    }
  }

  addFocusTextarea() {
    this.textarea.focus();
  }

  addNewLine() {
    this.textarea.value += '\n';
  }

  addSpace() {
    this.textarea.value += ' ';
  }

  changeRegister() {
    this.capsLk = !this.capsLk;
    this.keys.forEach((key) => {
      const dataAtr = this.capsLk ? 'shiftKey' : 'key';
      const text = key.querySelector('.key__text_key');
      const textShift = key.querySelector('.key__text_shiftKey');
      const newText = key.getAttribute(`data-${dataAtr}-${this.language}`);
      if (textShift) return;
      if (newText === 'null') return;
      text.innerText = newText;
    });
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
    this.keys.forEach((key) => {
      const text = key.querySelector('.key__text_key');
      const textShift = key.querySelector('.key__text_shiftKey');
      const newText = key.getAttribute(`data-key-${this.language}`);
      if (newText === 'null') return;
      if (textShift) {
        textShift.innerText = key.getAttribute(`data-shiftKey-${this.language}`);
      }
      text.innerText = newText;
    });
  }

  inputValue(value) {
    this.textarea.value += value;
  }

  changeValueKeydown(code) {
    const key = document.querySelector(`div[data-code=${code}]`);
    const text = key.querySelector('.key__text_key');
    const textShift = key.querySelector('.key__text_shiftKey');
    const value = textShift && this.capsLk ? textShift.innerText : text.innerText;
    this.inputValue(value);
  }

  addKeys() {
    const content = document.createElement('div');
    content.classList.add('key-board__content');
    this.keys = this.dataKeys.map((element, index) => {
      const key = new Key(
        element,
        this.language,
        index <= this.indexTwoKey,
      ).render();
      content.append(key);
      return key;
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
