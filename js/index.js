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

        itemElement.appendChild(cityDiv);
        listRideElement.appendChild(itemElement);
      });
    } else console.log('não ha itens a exibir');
  }

  async function getLocationData(longitude, latitude) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const response = await fetch(url);
    return await response.json();
  }
});
