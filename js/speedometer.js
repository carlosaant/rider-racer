'use strict';
document.addEventListener('DOMContentLoaded', function () {
  let isRunning = false;
  const speedElement = document.querySelector('#speed');
  const btnStartStop = document.querySelector('#btnStartstop');

  btnStartStop.addEventListener('click', () => {
    if (isRunning) {
      // Lógica para parar a ação
      isRunning = false;
      btnStartStop.textContent = 'Start';
    } else {
      // Lógica para iniciar a ação
      isRunning = true;
      btnStartStop.textContent = 'Stop';
    }
  });
});
