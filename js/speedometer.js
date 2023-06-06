'use strict';

document.addEventListener('DOMContentLoaded', function () {
  let isRunning = false;
  let intervalId;
  let watchId = null;
  let currentRide = null;
  const speedElement = document.querySelector('#speed');
  const btnStartStop = document.querySelector('#btnStartstop');
  const btnClose = document.querySelector('.btn-close');
  const counterElement = document.querySelector('#counter');

  btnStartStop.addEventListener('click', () => {
    if (isRunning) {
      // Lógica para parar a ação
      disableEnableButtonsOnScreen();
      showConfirmation('Finish the route?').then(response => {
        if (response) {
          isRunning = false;
          btnStartStop.textContent = 'Start';
          stopSpeedometer();
          stopNavigator();
          disableEnableButtonsOnScreen();
          window.location.href = './';
        } else {
          disableEnableButtonsOnScreen();
        }
      });
    } else {
      // Lógica para iniciar a ação
      navigator.geolocation.getCurrentPosition(
        function () {
          if (watchId) return;
          isRunning = true;
          btnStartStop.textContent = 'Stop';
          startSpeedometer();
          startNavigator();
        },
        // Função de erro - a permissão foi negada ou ocorreu um erro
        function (error) {
          if (error.code === error.PERMISSION_DENIED) {
            alert(
              `Location access denied. Please check your browser's privacy settings to allow geolocation and refresh the page.`
            );
          } else {
            console.log('Error while retrieving location:', error.message);
          }
        }
      );
    }
  });

  btnClose.addEventListener('click', () => {
    if (isRunning) {
      stopSpeedometer();
      stopNavigator();
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
      console.log(`ERROR(${error.code}): ${error.message}`);
      if (error.code === error.PERMISSION_DENIED) {
        stopSpeedometer();
        removeCurrentRide(currentRide);
        alert(
          `Location access denied. Please check your browser's privacy settings to allow geolocation and refresh the page.`
        );
      }
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
  function showConfirmation(message) {
    return new Promise((resolve, reject) => {
      const confirmationBox = document.createElement('div');
      confirmationBox.classList.add('confirmationBox');
      confirmationBox.innerHTML = `
        <p>${message}</p>
        <button id="finishBtn">Finish</button>
        <button id="cancelBtn">Cancel</button>
      `;

      const bodyElementWrapper = document.querySelector('.wrapper');
      bodyElementWrapper.appendChild(confirmationBox);

      document.getElementById('finishBtn').addEventListener('click', () => {
        resolve(true);
        bodyElementWrapper.removeChild(confirmationBox);
      });
      document.getElementById('cancelBtn').addEventListener('click', () => {
        resolve(false);
        bodyElementWrapper.removeChild(confirmationBox);
      });
    });
  }

  function disableEnableButtonsOnScreen() {
    if (!btnStartStop.disabled) btnStartStop.disabled = true;
    else btnStartStop.disabled = false;
  }
});
