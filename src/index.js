import KEYS from './data/keys';
import Keyboard from './js/keyboard';

const isChangeLanguage = (e) => {
  const isCode = e.code.includes('Shift') || e.code.includes('Alt');
  const isAltKey = e.altKey && !e.code.includes('Alt');
  const isShiftKey = e.shiftKey && !e.code.includes('Shift');
  return isCode && (isAltKey || isShiftKey);
};

window.addEventListener('load', () => {
  const keyboard = new Keyboard(KEYS);
  keyboard.addKeyBoard();

  const speshKeys = {
    ArrowLeft: (code) => keyboard.changePositionCursor(code),
    ArrowDown: (code) => keyboard.changePositionCursor(code),
    ArrowUp: (code) => keyboard.changePositionCursor(code),
    ArrowRight: (code) => keyboard.changePositionCursor(code),
    Enter: () => keyboard.addNewLine(),
    Space: () => keyboard.addSpace(),
    Tab: () => keyboard.addSpace(),
    CapsLock: () => keyboard.changeRegister(),
  };

  document.addEventListener('keydown', (e) => {
    keyboard.addActiveClass(e.code);
    if (isChangeLanguage(e)) {
      return keyboard.changeLanguage();
    }
    if (e.code === 'CapsLock') return keyboard.changeRegister();
  });

  document.addEventListener('keyup', (e) => {
    keyboard.removeActiveClass(e.code);
  });

  document.addEventListener('mousedown', (e) => {
    const isKey = e.target.classList.contains('key');
    const key = isKey ? e.target : e.target.closest('.key');
    if (!key) return;
    key.classList.add('js-active');
    const keyCode = key.getAttribute('data-code');
    const isSpeshKeys = Object.keys(speshKeys).includes(keyCode);
    if (isSpeshKeys) {
      return speshKeys[keyCode](keyCode);
    }
    const value = key.querySelector('.key__text_key').innerText;
    value && keyboard.inputValue(value);
  });

  document.addEventListener('mouseup', (e) => {
    const key = e.target.classList.contains('key')
      ? e.target
      : e.target.closest('.key');

    key && key.classList.remove('js-active');
    keyboard.addFocusTextarea();
  });
});
