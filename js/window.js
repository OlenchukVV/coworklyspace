// js/window.js
import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// Конфіг Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWwKso4qEdRK1SnWHxawP7Zm49BwcZz50",
  authDomain: "coworklyspace.firebaseapp.com",
  projectId: "coworklyspace",
  storageBucket: "coworklyspace.appspot.com",
  messagingSenderId: "1039847178271",
  appId: "1:1039847178271:web:9fbece3255c14b5217d52a",
  databaseURL: "https://coworklyspace-default-rtdb.firebaseio.com/"
};

// Запобігання дублюванню ініціалізації
let app;
try {
  app = getApp();
} catch (e) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);
const db = getDatabase(app);

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
  const bookButton = document.getElementById('reserveButton');

  // Заповнення даних
  modalTitle.textContent = data.name;
  modalDesc.textContent = data.desc;
  modalCity.textContent = data.city.charAt(0).toUpperCase() + data.city.slice(1);
  modalImage.src = data.image;
  modalPrice.textContent = `${data.price} грн/день`;
  modalFeatures.textContent = data.features || 'Немає додаткових зручностей';
  modalMap.href = data.map || '#';

  // Очистити попередній обробник
  const newBookButton = bookButton.cloneNode(true);
  bookButton.parentNode.replaceChild(newBookButton, bookButton);

  newBookButton.onclick = function () {
    const user = auth.currentUser;
    if (!user) {
      alert("Будь ласка, увійдіть, щоб забронювати місце.");
      return;
    }

    const userId = user.uid;
    const bookedSpace = {
      name: data.name,
      desc: data.desc,
      city: data.city,
      image: data.image,
      price: data.price,
      features: data.features,
      map: data.map,
      bookedAt: new Date().toISOString()
    };

    const userBookingRef = ref(db, 'bookedSpaces/' + userId);

    push(userBookingRef, bookedSpace)
      .then(() => {
        alert('Місце заброньовано!');
        modal.style.display = 'none';
      })
      .catch((error) => {
        console.error('Помилка при бронюванні:', error);
        alert('Сталася помилка при бронюванні.');
      });
  };

  // Показ модального вікна
  modal.style.display = 'block';

  // Обробник для закриття
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

