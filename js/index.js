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

  function getDistance(positions) {
    const earthRadiusKm = 6371;
    let totalDistance = 0;
    for (i = 0; i < positions.length - 1; i++) {
      //o laço só e executado se 2 posiçoes estiverem, no caso longitude e latitude
      //quando i foi menor que o tamanho-1 ele nao vai acessar o ultimo elemento, oque ocasionaria um erro
      const p1 = {
        latitude: positions[i].latitude,
        longitude: positions[i].longitude
      };
      const p2 = {
        latitude: positions[i + 1].latitude,
        longitude: positions[i + 1].longitude
      };
    }
  }
});
