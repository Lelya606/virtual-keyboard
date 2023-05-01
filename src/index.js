import KEYS from './data/keys';
import Keyboard from './js/keyboard';

window.addEventListener('load', () => new Keyboard(KEYS).addKeyBoard());

document.addEventListener('keydown', (e) => console.log(e));
