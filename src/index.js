import KEYS from './data/keys';
import Keyboard from './js/keyboard';

window.addEventListener('load', () => {
  const keyboard = new Keyboard(KEYS);
  keyboard.addKeyBoard();
  document.addEventListener('keydown', (e) => {
    keyboard.addActiveClass(e.code);
  });
  document.addEventListener('keyup', (e) => {
    keyboard.removeActiveClass(e.code);
  });
});
