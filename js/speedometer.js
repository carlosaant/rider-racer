'use strict';
document.addEventListener('DOMContentLoaded', function () {
  let isRunning = false;
  let intervalId;
  const speedElement = document.querySelector('#speed');
  const btnStartStop = document.querySelector('#btnStartstop');
  const counterElement = document.querySelector('#counter');

  btnStartStop.addEventListener('click', () => {
    if (isRunning) {
      // Lógica para parar a ação
      isRunning = false;
      btnStartStop.textContent = 'Start';
      //
      stopCronometro();
    } else {
      // Lógica para iniciar a ação
      isRunning = true;
      btnStartStop.textContent = 'Stop';
      //
      startCronometro();
      // navigator.geolocation.watchPosition();
    }
  });

  // cronometro
  function startCronometro() {
    let counter = 0;
    intervalId = setInterval(function () {
      counter++;
      let formattedCounter = formatTime(counter);
      counterElement.textContent = formattedCounter;
    }, 1000);
  }
  function stopCronometro() {
    clearInterval(intervalId);
  }

  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let formattedMinutes = padZero(minutes);
    let formattedSeconds = padZero(seconds);
    return formattedMinutes + ':' + formattedSeconds;
  }

  function padZero(number) {
    return (number < 10 ? '0' : '') + number;
  }
});
