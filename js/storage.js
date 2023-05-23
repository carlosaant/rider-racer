'use strict';

function createNewRide() {
  const rideID = new Date.now();
  const rideRecord = {
    data: [],
    startTime: new Date.now(),
    stopTime: null
  };

  return setLocalStorage(rideID, rideRecord);
}

function setLocalStorage(rideID, rideRecord) {
  localStorage.setItem(rideID, rideRecord);
  return rideID;
}
