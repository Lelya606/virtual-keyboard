import Key from './key';

export default class Keyboard {
  constructor(data) {
    this.dataKeys = data;
  }

  addKey(keyBoard) {
    this.dataKeys.forEach((element) => {
      const key = new Key(element, 'en').render();
      keyBoard.append(key);
    });
  }

  addKeyBoard() {
    const keyBoard = document.createElement('div');
    keyBoard.classList.add('key-board');
    this.addKey(keyBoard);
    const { body } = document;
    body.append(keyBoard);
  }
}
