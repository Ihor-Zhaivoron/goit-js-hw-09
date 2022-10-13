const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

let intervald = null;

function onStartBtn() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  intervald = setInterval(
    () =>
      (body.style.backgroundColor = `#${Math.floor(
        Math.random() * 16777215
      ).toString(16)}`),
    1000
  );
}
function onStopBtn() {
  clearInterval(intervald);
  stopBtn.disabled = true;
  startBtn.disabled = false;
}

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }
