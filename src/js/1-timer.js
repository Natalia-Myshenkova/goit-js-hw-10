console.log('timer.js завантажився!');

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('.js-start-btn');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let intervalId;
let userSelectedDate = null;

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDate = selectedDates[0];
    if (!pickedDate) return;

    if (pickedDate.getTime() <= Date.now()) {
      userSelectedDate = null;
      startBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight'
      });
      return;
    }

    userSelectedDate = pickedDate;
    startBtn.disabled = false;
  }
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


  startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;
  if (intervalId) clearInterval(intervalId);

  dateInput.disabled = true;
  startBtn.disabled = true;

  intervalId = setInterval(() => {
    const diff = userSelectedDate.getTime() - Date.now();

    if (diff <= 0) {
      clearInterval(intervalId);
      dateInput.disabled = false;
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const time = convertMs(diff);
    daysEl.textContent = addLeadingZero(time.days);
    hoursEl.textContent = addLeadingZero(time.hours);
    minutesEl.textContent = addLeadingZero(time.minutes);
    secondsEl.textContent = addLeadingZero(time.seconds);
  }, 1000);
});