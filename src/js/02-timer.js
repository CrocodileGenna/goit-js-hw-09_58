// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  button: document.querySelector('button'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.button.disabled = true;

// script

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentTime = selectedDates[0].getTime();
    if (Date.now() >= currentTime) {
      refs.button.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    refs.button.disabled = false;
    dataNumber.splice(0, 1, currentTime);
  },
};
let dataNumber = [];

flatpickr(refs.input, options);

function convertMs(ms) {
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return renderTime({ days, hours, minutes, seconds });
}

function renderTime({ days, hours, minutes, seconds }) {
  refs.days.innerHTML = days;
  refs.hours.innerHTML = hours;
  refs.minutes.innerHTML = minutes;
  refs.seconds.innerHTML = seconds;
}
refs.button.addEventListener('click', () => {
  const idSetInstrvval = setInterval(() => {
    let lastNumber = [dataNumber - Date.now()];
    convertMs(dataNumber - Date.now());
    if (lastNumber.join().length === 3) {
      clearInterval(idSetInstrvval);
      return;
    }
  }, 1000);
  refs.button.disabled = true;
  refs.input.disabled = true;
});

// style
const body = document.querySelector('body');
body.style.backgroundColor = '#8d8d8d';

const title = document.querySelector('.title');
title.style.display = 'flex';
title.style.justifyContent = 'center';
title.style.fontSize = '40px';
title.style.color = 'red';
title.style.margin = '0px';

const timer = document.querySelector('.timer');
timer.style.display = 'flex';
timer.style.justifyContent = 'center';

const field = document.querySelectorAll('.field');
field.forEach(e => {
  e.style.display = 'flex';
  e.style.margin = '20px 20px 0 0';
  e.style.alignItems = 'center';
});

const value = document.querySelectorAll('.value');
value.forEach(e => {
  e.style.color = '#d7d75b';
  e.style.backgroundColor = 'black';
  e.style.padding = '10px';
  e.style.borderRadius = '5px';
  e.style.margin = '0 10px 0 0 ';
});

const label = document.querySelectorAll('.label');
label.forEach(e => {
  e.style.color = 'yellow';
  e.style.fontSize = '20px';
});
