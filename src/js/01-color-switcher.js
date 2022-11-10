import throttle from 'lodash.throttle';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const refs = {
  start: body.children[1],
  stop: body.children[2],
};

refs.stop.disabled = true;

console.log(refs.start);
console.log(refs.stop);

refs.start.addEventListener('click', backgroundColorBody);
refs.stop.addEventListener('click', backgroundColorBodyStop);

let backgroundColorBodyStart;

function backgroundColorBody(e) {
  backgroundColorBodyStart = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.start.disabled = true;
  refs.stop.disabled = false;
}

function backgroundColorBodyStop(e) {
  refs.start.disabled = false;
  clearInterval(backgroundColorBodyStart);
  refs.stop.disabled = true;
}
