// import { concat } from 'lodash';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  firstValue: document.querySelector("input[name='delay']"),
  stepValue: document.querySelector("input[name='step']"),
  amountValue: document.querySelector("input[name='amount']"),
};

refs.form.addEventListener('submit', renderAwait);

function renderAwait(e) {
  e.preventDefault();
  const firstValue = Number(refs.firstValue.value);
  const stepValue = Number(refs.stepValue.value);
  const amountValue = Number(refs.amountValue.value);

  let firstValuePlusStep = firstValue;

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, firstValuePlusStep)
      .then(({ i, firstValuePlusStep }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${i} in ${firstValuePlusStep}ms`
        );
      })
      .catch(({ i, firstValuePlusStep }) => {
        reject(
          Notiflix.Notify.failure(
            `❌ Rejected promise ${i} in ${firstValuePlusStep}ms`
          )
        );
      });
    firstValuePlusStep += stepValue;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((respons, reject) => {
    setTimeout(() => {
      console.log(delay, position);
      if (shouldResolve) {
        // Fulfill
        respons({ position, delay });
      }
      // Reject
      reject({ position, delay });
    }, delay);
  });
}
