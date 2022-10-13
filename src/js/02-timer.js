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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      //   refs.startBtn.disabled = true;
      startBtn.removeAttribute('disabled');
    } else {
      Notify.failure('Please choose a date in the future');
      //   refs.startBtn.disabled = true;
      startBtn.setAttribute('disabled', 'disabled');
    }
  },
};
const fp = flatpickr('#datetime-picker', options); // flatpickr
