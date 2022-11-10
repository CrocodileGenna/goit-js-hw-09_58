// import { concat } from 'lodash';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  firstValue: document.querySelector("input[name='delay']"),
  stepValue: document.querySelector("input[name='step']"),
  amountValue: document.querySelector("input[name='amount']"),
  button: document.querySelector('button'),
};

refs.form.addEventListener('submit', renderAwait);

function renderAwait(e) {
  e.preventDefault();
  const firstValue = Number(refs.firstValue.value);
  const stepValue = Number(refs.stepValue.value);
  const amountValue = Number(refs.amountValue.value);

  let firstValuePlusStep = firstValue;

  for (let i = 0; i <= amountValue; i++) {
    createPromise(i, firstValuePlusStep)
      .then(({ i, firstValuePlusStep }) => {
        console.log(`✅ Fulfilled promise ${i} in ${firstValuePlusStep}ms`);
      })
      .catch(({ i, firstValuePlusStep }) => {
        console.log(`❌ Rejected promise ${i} in ${firstValuePlusStep}ms`);
      });
    firstValuePlusStep += stepValue;
  }
}

function createPromise(position, delay) {
  return new Promise((respons, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      console.log(delay);
      if (shouldResolve) {
        // Fulfill
        respons(
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          )
        );
      }
      // Reject
      reject(
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    }, delay);
  });
}
