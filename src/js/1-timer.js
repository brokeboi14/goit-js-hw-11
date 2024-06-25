import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let timerInterval;
let userSelectedDate;

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
}

function startTimer(endTime) {
    timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeLeft = endTime - currentTime;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            datetimePicker.disabled = false;
            iziToast.info({ title: 'Info', message: 'Countdown finished!' });
        } else {
            updateTimerDisplay(convertMs(timeLeft));
        }
    }, 1000);
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

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const currentTime = new Date().getTime();

        if (userSelectedDate.getTime() <= currentTime) {
            iziToast.warning({ title: 'Warning', message: 'Please choose a date in the future' });
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
    if (!userSelectedDate) {
        return;
    }

    const endDate = userSelectedDate.getTime();

    const currentTime = new Date().getTime();
    if (endDate <= currentTime) {
        iziToast.warning({ title: 'Warning', message: 'Please enter a future date and time.' });
        return;
    }

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    datetimePicker.disabled = true;
    startButton.disabled = true;

    startTimer(endDate);
});
