'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const listRideElement = document.querySelector('#rideList');
  loadList();

  function loadList() {
    const allRides = getAllRides();
    if (allRides) {
      allRides.forEach(([id, value]) => {
        const ride = JSON.parse(value);
        ride.id = id;
        const itemElement = document.createElement('li');
        itemElement.id = ride.id;
        itemElement.innerText = ride.id;
        listRideElement.appendChild(itemElement);
      });
    } else console.log('não ha itens a exibir');
  }
});
