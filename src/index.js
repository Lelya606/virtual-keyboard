import KEYS from './data/keys';
import Keyboard from './js/keyboard';

const isChangeLanguage = (e) => {
  const isCode = e.code.includes('Shift') || e.code.includes('Alt');
  const isAltKey = e.altKey && !e.code.includes('Alt');
  const isShiftKey = e.shiftKey && !e.code.includes('Shift');
  return isCode && (isAltKey || isShiftKey);
}

window.addEventListener('load', () => {
  const keyboard = new Keyboard(KEYS);
  keyboard.addKeyBoard();
  document.addEventListener('keydown', (e) => {
    keyboard.addActiveClass(e.code);
    if (isChangeLanguage(e)) {
      return keyboard.changeLanguage();
    }
  });

  document.addEventListener('keyup', (e) => {
    keyboard.removeActiveClass(e.code);
  });
});
