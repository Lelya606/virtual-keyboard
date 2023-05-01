import KEYS from './data/keys';
import Key from './js/key';

const keyBoard = document.createElement('div');
keyBoard.classList.add('key-board');
const { body } = document;
body.append(keyBoard);

KEYS.forEach((element) => {
  const key = new Key(element).render();
  keyBoard.append(key);
});

document.addEventListener('keydown', (e) => console.log(e));
