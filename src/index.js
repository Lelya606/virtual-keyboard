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
    Backspace: (code) => keyboard.deleteLetter(code),
    Delete: (code) => keyboard.deleteLetter(code),
    ShiftLeft: () => {},
    ShiftRight: () => {},
    AltLeft: () => {},
    AltRight: () => {},
    MetaLeft: () => {},
    ControlRight: () => {},
    ControlLeft: () => {}
  };

  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    keyboard.addActiveClass(e.code);
    if (isChangeLanguage(e)) return keyboard.changeLanguage();
    if (e.code === 'CapsLock') return keyboard.changeRegister();
    if (e.code.includes('Shift') && !e.altKey) return keyboard.changeRegister();
    const isSpeshKeys = Object.keys(speshKeys).includes(e.code);
    if (isSpeshKeys) return speshKeys[e.code](e.code);
    keyboard.changeValueKeydown(e.code);
  });

  document.addEventListener('keyup', (e) => {
    keyboard.removeActiveClass(e.code);
    if (e.code.includes('Shift') && !e.altKey) {
      keyboard.changeRegister();
    }
  });

  document.addEventListener('mousedown', (e) => {
    const isKey = e.target.classList.contains('key');
    const key = isKey ? e.target : e.target.closest('.key');
    if (!key) return;
    key.classList.add('js-active');
    const keyCode = key.getAttribute('data-code');
    const isSpeshKeys = Object.keys(speshKeys).includes(keyCode);
    if (isSpeshKeys) return speshKeys[keyCode](keyCode);
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
