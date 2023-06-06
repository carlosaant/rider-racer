'use strict';

function createNewRide() {
  const rideID = Date.now();
  const rideRecord = {
    data: [],
    startTime: Date.now(),
    stopTime: null
  };

  setLocalStorage(rideID, rideRecord);
  return rideID;
}

function setLocalStorage(rideID, rideRecord) {
  localStorage.setItem(rideID, JSON.stringify(rideRecord));
}

function getRideRecord(rideID) {
  return JSON.parse(localStorage.getItem(rideID));
}

function addPosition(rideID, position) {
  const rideRecord = getRideRecord(rideID);
  const newData = {
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    speed: position.coords.speed,
    timeStamp: position.timeStamp
  };
  rideRecord.data.push(newData);
  setLocalStorage(rideID, rideRecord);
}

function updateStopTime(rideID) {
  const rideRecord = getRideRecord(rideID);
  rideRecord.stopTime = Date.now();
  setLocalStorage(rideID, rideRecord);
}

function removeCurrentRide(rideID) {
  localStorage.removeItem(rideID);
}

function getAllRides() {
  if (localStorage.length === 0) return null;
  else {
    const filteredEntries = Object.entries(localStorage).filter(
      ([key, value]) => {
        if (typeof value === 'string') {
          try {
            const parsedValue = JSON.parse(value);
            return parsedValue.hasOwnProperty('data'); // Filtrar por objetos que possuem a propriedade 'data'
          } catch (error) {
            return false; // Ignorar valores que não são JSON válidos
          }
        }
        return false; // Ignorar valores que não são strings
      }
    );

    return filteredEntries;
  }
  // if (localStorage.length === 0) return null;
  // else return Object.entries(localStorage);
}
