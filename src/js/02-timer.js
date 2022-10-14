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
  onClose(selectedDates) {
    currentDate = selectedDates[0].getTime();
    if (selectedDates[0] > new Date()) {
      //   refs.startBtn.disabled = true;
      refs.startBtn.removeAttribute('disabled');
    } else {
      Notify.failure('Please choose a date in the future');
      //   refs.startBtn.disabled = true;
      refs.startBtn.setAttribute('disabled', 'disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onStart);
function onStart() {
  refs.startBtn.disabled = true;
  const timerId = setInterval(() => {
    changeDate(timerId);
  }, 1000);
}

function changeDate(timerId) {
  const dateNow = new Date();

  insertData(convertMs(currentDate - dateNow));
  if (currentDate - dateNow < 0) {
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
  return value.toSring().padStart(2, 0);
}
