import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const delayInput = document.querySelector(".delay");
const resolveRadio = document.querySelector(".resolve");

form.addEventListener("submit", e => {
  e.preventDefault();

  const delay = Number(delayInput.value);
  const shouldResolve = resolveRadio.checked;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
        color: "#59a10d",
      });
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
        color: "#ef4040",
      });
      console.log(`❌ Rejected promise in ${delay}ms`);
    });

  form.reset();
});