'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const rideID = params.get('id');
  if (rideID != null) {
    const ride = getRideRecord(rideID);
    loadData(ride);
  } else {
    console.log('null ou id invalido');
  }

  async function loadData(ride) {
    const detailDataDiv = document.getElementById('detailData');

    const firstPosition = ride.data[0]; //o primeiro registro para determinar a cidade
    const firstLocationData = await getLocationData(
      firstPosition.longitude,
      firstPosition.latitude
    );

    const mapDiv = document.createElement('div');
    const contentInfosDiv = document.createElement('div');
    mapDiv.classList.add('mapDiv');
    contentInfosDiv.classList.add('dataInfosDiv');

    const cityDiv = document.createElement('div');
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.principalSubdivision}`;
    cityDiv.classList.add('cityInfo');

    const maxSpeedDiv = document.createElement('div');
    maxSpeedDiv.innerText = `Max. Speed: ${getMaxSpeed(ride.data)} Km/h`;
    maxSpeedDiv.classList.add('infoDetails');

    const distanceDiv = document.createElement('div');
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`;

    const durationDiv = document.createElement('div');
    durationDiv.innerText = `Duration: ${getDuration(ride)}`;

    const dateDiv = document.createElement('div');
    dateDiv.innerText = getStartDate(ride);
    dateDiv.classList.add('dateInfo');

    contentInfosDiv.appendChild(cityDiv);
    contentInfosDiv.appendChild(maxSpeedDiv);
    contentInfosDiv.appendChild(distanceDiv);
    contentInfosDiv.appendChild(durationDiv);
    contentInfosDiv.appendChild(dateDiv);
    detailDataDiv.appendChild(mapDiv);
    detailDataDiv.appendChild(contentInfosDiv);
  }
});
