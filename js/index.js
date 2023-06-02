'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const listRideElement = document.querySelector('#rideList');
  loadList();
  function loadList() {
    const allRides = getAllRides();
    if (allRides) {
      allRides.forEach(async ([id, value]) => {
        const ride = JSON.parse(value);
        ride.id = id;

        const itemElement = document.createElement('li');
        itemElement.id = ride.id;
        listRideElement.appendChild(itemElement);

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
        itemElement.appendChild(mapDiv);
        itemElement.appendChild(contentInfosDiv);
      });
    } else {
      const noFoundElement = document.createElement('div');
      noFoundElement.classList.add('noRecordsDiv');
      noFoundElement.innerText = 'No Records found.';
      listRideElement.appendChild(noFoundElement);
    }
  }
});
