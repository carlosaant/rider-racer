'use strict';

document.addEventListener('DOMContentLoaded', function () {
  let isRunning = false;
  let intervalId;
  let watchId = null;
  let currentRide = null;
  const speedElement = document.querySelector('#speed');
  const btnStartStop = document.querySelector('#btnStartstop');
  const counterElement = document.querySelector('#counter');

  btnStartStop.addEventListener('click', () => {
    if (isRunning) {
      // Lógica para parar a ação
      if (confirm('Deseja parar o percurso?')) {
        if (!watchId) return;
        //
        isRunning = false;
        btnStartStop.textContent = 'Start';
        //
        stopSpeedometer();
        stopNavigator();
      }
    } else {
      // Lógica para iniciar a ação
      if (watchId) return;
      //
      isRunning = true;
      btnStartStop.textContent = 'Stop';
      //
      startSpeedometer();
      startNavigator();
    }
  });

  // navigator
  function startNavigator() {
    function handleSucess(position) {
      addPosition(currentRide, position);
      speedElement.innerText = position.coords.speed
        ? (position.coords.speed * 3.6).toFixed(1)
        : 0;
    }
    function handleError(error) {
      console.log(error.msg);
    }
    const options = { enableHighAccuracy: true };
    currentRide = createNewRide();
    watchId = navigator.geolocation.watchPosition(
      handleSucess,
      handleError,
      options
    );
  }

  function stopNavigator() {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    updateStopTime(currentRide);
    currentRide = null;
  }

  // cronometro
  function startSpeedometer() {
    let counter = 0;
    intervalId = setInterval(function () {
      counter++;
      let formattedCounter = formatTime(counter);
      counterElement.textContent = formattedCounter;
    }, 1000);
  }
  function stopSpeedometer() {
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
