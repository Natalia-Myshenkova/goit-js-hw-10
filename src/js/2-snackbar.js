
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const delayInput = document.querySelector('.delay');
const resolveRadio = document.querySelector('.resolve');
const rejectRadio = document.querySelector('.reject');
const createBtn = document.querySelector('.create-btn');

createBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const delay = Number(delayInput.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (resolveRadio.checked) {
        resolve(delay); 
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        color: '#59a10d'
      });
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        color: '#ef4040'
      });
    });
    document.querySelector('.form').reset();
});
