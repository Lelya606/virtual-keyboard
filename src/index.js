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

  document.addEventListener('mousedown', (e) => {
    const isKey = e.target.classList.contains('key');
    const key = isKey ? e.target : e.target.closest('.key');
    if (!key) return;
    key.classList.add('js-active');
    const value = key.querySelector('.key__text_key').innerText;
    value && keyboard.inputValue(value);
  });

  document.addEventListener('mouseup', (e) => {
    const key = e.target.classList.contains('key')
      ? e.target
      : e.target.closest('.key');

    key && key.classList.remove('js-active');
  });
});
