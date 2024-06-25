import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const delayInput = form.elements.delay;
        const stateInputs = form.elements.state;
        const delay = parseInt(delayInput.value, 10);
        const state = Array.from(stateInputs).find(input => input.checked).value;
        if (isNaN(delay)) {
            iziToast.error({
                title: 'Error',
                message: 'Please enter a valid number for delay.'
            });
            return;
        }
        createPromise(delay, state)
            .then((delay) => {
                iziToast.success({
                    title: 'OK',
                    message: `✅ Fulfilled promise in ${delay}ms`
                });
            })
            .catch((delay) => {
                iziToast.error({
                    title: 'Error',
                    message: `❌ Rejected promise in ${delay}ms`
                });
            });
    });
});
function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}