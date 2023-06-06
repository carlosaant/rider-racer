'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const btnDelete = document.getElementById('btn-delete');
  const params = new URLSearchParams(window.location.search);
  const rideID = params.get('id');
  if (rideID != null) {
    const ride = getRideRecord(rideID);
    loadData(ride);
  } else {
    console.log('null ou id invalido');
  }

  async function loadData(ride) {
    showLoading();
    const detailDataDiv = document.getElementById('detailData');

    const firstPosition = ride.data[0]; //o primeiro registro para determinar a cidade
    const firstLocationData = await getLocationData(
      firstPosition.longitude,
      firstPosition.latitude
    );

    const contentInfosDiv = document.createElement('div');
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
    detailDataDiv.appendChild(dateDiv);
    detailDataDiv.appendChild(contentInfosDiv);

    // map
    const map = L.map('mapDetail');
    map.setView([firstPosition.latitude, firstPosition.longitude], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 5,
      maxZoom: 19
    }).addTo(map);
    const positionsArray = ride.data.map(position => {
      return [position.latitude, position.longitude];
    });
    const polyline = L.polyline(positionsArray, { color: '#F00' });
    polyline.addTo(map);
    map.fitBounds(polyline.getBounds());
    hideLoading(detailDataDiv);
  }

  function showLoading() {
    let loadingContainer = document.getElementById('loadingContainer');
    let loadingElement = document.createElement('div');
    loadingElement.classList.add('loading');
    btnDelete.classList.add('hide');
    loadingContainer.appendChild(loadingElement);
  }
  function hideLoading(detailDataDiv) {
    let loadingContainer = document.getElementById('loadingContainer');
    loadingContainer.innerHTML = '';
    detailDataDiv.classList.remove('hide');
    detailDataDiv.classList.add('show');
    btnDelete.classList.remove('hide');
    btnDelete.classList.add('show');
  }
});
