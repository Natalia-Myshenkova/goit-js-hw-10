
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const delayInput = document.querySelector('.delay');
const resolveRadio = document.querySelector('.resolve');
const rejectRadio = document.querySelector('.reject');
const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const delay = Number(delayInput.value);

  const promise = new Promise((resolve, reject) => {
    if (resolveRadio.checked) {
      setTimeout(() => resolve(`✅ Fulfilled promise in ${delay}ms`), delay);
    } else if (rejectRadio.checked) {
      setTimeout(() => reject(`❌ Rejected promise in ${delay}ms`), delay);
    } else {
      reject(" Please select an option");
    }
  });

  promise
    .then(message => {
      console.log(message);
      iziToast.show({
        message: message,
        position: 'topRight',
        color: '#59a10d'
      });
    })
    .catch(message => {
      console.log(message);
      iziToast.show({
        message: message,
        position: 'topRight',
        color: '#ef4040'
      });
    });

  form.reset();
});