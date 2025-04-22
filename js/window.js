// js/window.js
export function setupModal() {
  const modal = document.getElementById('modal');
  const closeBtn = modal.querySelector('.modal-close');

  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

export function openModal(data) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCity = document.getElementById('modalCity');
  const modalImage = document.getElementById('modalImage');
  const modalPrice = document.getElementById('modalPrice');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalMap = document.getElementById('modalMap');
  const modalClose = document.querySelector('.modal-close');

  // Додаємо ідентифікатор для кнопки бронювання
  const bookButton = document.getElementById('reserveButton');  // Ось сюди

  modalTitle.textContent = data.name;
  modalDesc.textContent = data.desc;
  modalCity.textContent = data.city.charAt(0).toUpperCase() + data.city.slice(1);
  modalImage.src = data.image;
  modalPrice.textContent = `${data.price} грн/день`;
  modalFeatures.textContent = data.features || 'Немає додаткових зручностей';
  modalMap.href = data.map || '#';

  // Відкриття модального вікна
  modal.style.display = 'block';

  // Закриття модалки
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Бронювання місця
  bookButton.onclick = function() {
    const userId = firebase.auth().currentUser.uid; // Отримуємо ID користувача, якщо він автентифікований
    const bookedSpace = {
      name: data.name,
      desc: data.desc,
      city: data.city,
      image: data.image,
      price: data.price,
      features: data.features,
      map: data.map
    };

    // Додаємо інформацію до Firebase під унікальним ID користувача
    firebase.database().ref('bookedSpaces/' + userId).push(bookedSpace)
      .then(() => {
        alert('Місце заброньовано!');
        modal.style.display = 'none'; // Закриваємо модальне вікно
      })
      .catch((error) => {
        console.error('Error booking space:', error);
      });
  };
}

