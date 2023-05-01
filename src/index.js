import KEYS from './data/keys';
import Keyboard from './js/keyboard';

window.addEventListener('load', () => {
  const keyboard = new Keyboard(KEYS);
  keyboard.addKeyBoard();
  document.addEventListener('keydown', (e) => {
    keyboard.addActiveClass(e.key);
    console.log(e);
  });
  document.addEventListener('keyup', (e) => {
    keyboard.removeActiveClass(e.key);
    console.log(e);
  });
});
