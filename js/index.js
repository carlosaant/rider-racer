'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const listRideElement = document.querySelector('#rideList');
  loadList();

  function loadList() {
    const allRides = getAllRides();
    if (allRides) {
      allRides.forEach(async ([id, value]) => {
        const ride = JSON.parse(value);
        const firstPosition = ride.data[0]; //o primeiro registro para determinar a cidade
        const firstLocationData = await getLocationData(
          firstPosition.longitude,
          firstPosition.latitude
        );

        ride.id = id;
        const itemElement = document.createElement('li');
        itemElement.id = ride.id;
        const cityDiv = document.createElement('div');
        cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.principalSubdivision}`;

        const maxSpeedDiv = document.createElement('div');
        maxSpeedDiv.innerText = getMaxSpeed(ride.data);

        itemElement.appendChild(cityDiv);
        itemElement.appendChild(maxSpeedDiv);
        listRideElement.appendChild(itemElement);
      });
    } else console.log('não ha itens a exibir');
  }

  async function getLocationData(longitude, latitude) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const response = await fetch(url);
    return await response.json();
  }

  function getMaxSpeed(positions) {
    let maxSpeed = 0;
    positions.forEach(position => {
      if (position.speed != null && position.speed > maxSpeed) {
        maxSpeed = position.speed;
      }
    });

    return (maxSpeed * 3.6).toFixed(1);
  }
});
