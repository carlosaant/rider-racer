'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const listRideElement = document.querySelector('#rideList');
  loadList();
  function loadList() {
    const allRides = getAllRides();

    if (allRides) {
      let countRegisters = 0;
      allRides.forEach(async ([id, value]) => {
        const ride = JSON.parse(value);
        ride.id = id;
        countRegisters++;

        const itemElement = document.createElement('li');
        itemElement.id = ride.id;
        listRideElement.appendChild(itemElement);
        showLoading(itemElement);

        itemElement.addEventListener('click', () => {
          window.location.href = `./detail.html?id=${ride.id}`;
        });

        const firstPosition = ride.data[0]; //o primeiro registro para determinar a cidade
        const firstLocationData = await getLocationData(
          firstPosition.longitude,
          firstPosition.latitude
        );

        const mapID = `map${ride.id}`;
        const mapDiv = document.createElement('div');
        mapDiv.id = mapID;
        mapDiv.classList.add('mapDiv');

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

        contentInfosDiv.appendChild(cityDiv);
        contentInfosDiv.appendChild(maxSpeedDiv);
        contentInfosDiv.appendChild(distanceDiv);
        contentInfosDiv.appendChild(durationDiv);
        contentInfosDiv.appendChild(dateDiv);
        itemElement.appendChild(mapDiv);
        itemElement.appendChild(contentInfosDiv);

        // map
        const map = L.map(mapID, {
          zoomControl: false,
          dragging: false,
          attributionControl: false,
          scrollWheelZoom: false
        });
        map.setView([firstPosition.latitude, firstPosition.longitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          minZoom: 5,
          maxZoom: 19
        }).addTo(map);
        L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map);

        itemElement.removeChild(itemElement.firstChild);
      });

      const countDiv = document.createElement('div');
      countDiv.classList.add('registersdiv');
      countDiv.innerText = `${countRegisters} records found.`;
      listRideElement.appendChild(countDiv);
    } else {
      const noFoundElement = document.createElement('div');
      noFoundElement.classList.add('noRecordsDiv');
      noFoundElement.innerText = 'No Records found.';
      listRideElement.appendChild(noFoundElement);
    }
  }

  function showLoading(element) {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('loading');
    element.appendChild(loadingElement);
  }
});
