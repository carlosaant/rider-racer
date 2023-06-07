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
    maxSpeedDiv.classList.add('infoDetails');
    const iconSpeed = document.createElement('img');
    iconSpeed.src = './assets/images/icon-speed.svg';
    maxSpeedDiv.appendChild(iconSpeed);
    const speedText = document.createTextNode(
      `Max: ${getMaxSpeed(ride.data)} Km/h`
    );
    maxSpeedDiv.appendChild(speedText);

    const distanceDiv = document.createElement('div');
    distanceDiv.classList.add('infoDetails');
    const iconDistance = document.createElement('img');
    iconDistance.src = './assets/images/icon-distance.svg';
    distanceDiv.appendChild(iconDistance);
    const distanceText = document.createTextNode(
      `Distance: ${getDistance(ride.data)} Km`
    );
    distanceDiv.appendChild(distanceText);

    const durationDiv = document.createElement('div');
    durationDiv.classList.add('infoDetails');
    const iconDuration = document.createElement('img');
    iconDuration.src = './assets/images/icon-duration.svg';
    durationDiv.appendChild(iconDuration);
    const durationText = document.createTextNode(
      `Duration: ${getDuration(ride)}`
    );
    durationDiv.appendChild(durationText);

    const dateDiv = document.createElement('div');
    dateDiv.innerText = getStartDate(ride);
    dateDiv.classList.add('dateInfo');

    contentInfosDiv.appendChild(maxSpeedDiv);
    contentInfosDiv.appendChild(distanceDiv);
    contentInfosDiv.appendChild(durationDiv);
    detailDataDiv.appendChild(dateDiv);
    detailDataDiv.appendChild(cityDiv);
    detailDataDiv.appendChild(contentInfosDiv);

    // delete
    btnDelete.addEventListener('click', () => {
      if (confirm('delete this record?')) {
        removeCurrentRide(rideID);
        window.location.href = './';
      }
    });

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
