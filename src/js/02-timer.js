import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysRef: document.querySelector('[data-days]'),
  hoursRef: document.querySelector('[data-hours]'),
  minutesRef: document.querySelector('[data-minutes]'),
  secondsRef: document.querySelector('[data-seconds]'),
};

let currentDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(date) {
    currentDate = new Date(date);
    onChangeDate();
  },
  onClose(date) {
    currentDate = new Date(date);
    onCloseCalendar();
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onStart);

function onChangeDate() {
  const dateNow = Date.now();
  if (currentDate <= dateNow) {
    refs.startBtn.setAttribute('disabled', 'disabled');
  } else {
    refs.startBtn.removeAttribute('disabled');
  }
}

function onCloseCalendar() {
  const dateNow = Date.now();
  if (currentDate <= dateNow) {
    Notify.failure('Please choose a date in the future', {});
  }
}

function onStart() {
  refs.startBtn.disabled = true;
  const timerId = setInterval(() => {
    changeDate(timerId);
  }, 1000);
}

function changeDate(timerId) {
  const dateNow = new Date();
  insertData(convertMs(currentDate - dateNow));
  if (currentDate - dateNow < 900) {
    clearInterval(timerId);
    Notify.failure('The moment has come');
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function insertData({ days, hours, minutes, seconds }) {
  refs.daysRef.textContent = addLeadingZero(days);
  refs.hoursRef.textContent = addLeadingZero(hours);
  refs.minutesRef.textContent = addLeadingZero(minutes);
  refs.secondsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
