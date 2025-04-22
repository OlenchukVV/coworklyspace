import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWwKso4qEdRK1SnWHxawP7Zm49BwcZz50",
  authDomain: "coworklyspace.firebaseapp.com",
  projectId: "coworklyspace",
  storageBucket: "coworklyspace.appspot.com",
  messagingSenderId: "1039847178271",
  appId: "1:1039847178271:web:9fbece3255c14b5217d52a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Вибираємо елементи
const loginLink = document.getElementById("loginLink");
const registerLink = document.getElementById("registerLink");
const dashboardLink = document.getElementById("dashboardLink");
const logoutBtn = document.getElementById("logoutBtn");
const startNowBtn = document.getElementById("startNowBtn");

onAuthStateChanged(auth, (user) => {
  console.log("Стан авторизації:", user); // Для перевірки
  
  if (user) {
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
    if (dashboardLink) dashboardLink.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "inline-block";

     // ✅ Якщо авторизований — оновлюємо кнопку
    if (startNowBtn) {
      startNowBtn.textContent = "Знайти місця";
      startNowBtn.onclick = () => {
        window.location.href = "search.html";
      };
    }
  } else {
    if (loginLink) loginLink.style.display = "inline-block";
    if (registerLink) registerLink.style.display = "inline-block";
    if (dashboardLink) dashboardLink.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";

    // 🔁 Якщо неавторизований — повертаємо стандартний текст
    if (startNowBtn) {
      startNowBtn.textContent = "Почати зараз";
      startNowBtn.onclick = () => {
        window.location.href = "auth.html";
      };
    }
  }
});

// Вихід
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      location.reload();
    });
  });
}

// Кнопка "Увійти / Реєстрація"
const authBtn = document.getElementById("authBtn");

if (authBtn) {
  authBtn.addEventListener("click", () => {
    window.location.href = "auth.html";
  });
}

// Функція для бронювання місця
function bookPlace(place) {
    // Зберігаємо інформацію про заброньоване місце в localStorage
    localStorage.setItem('bookedPlace', place);

    // Повідомляємо користувача про успішне бронювання
    alert(`Ви забронювали місце: ${place}`);
    
    // Оновлюємо кнопку, щоб показати, що місце заброньовано
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent === 'Забронювати') {
            button.textContent = 'Заброньовано';
            button.disabled = true;
        }
    });
}

// Перевірка на завантаження сторінки, щоб побачити, чи є збережене заброньоване місце
window.onload = function() {
    const bookedPlace = localStorage.getItem('bookedPlace');
    if (bookedPlace) {
        alert(`Ви вже забронювали: ${bookedPlace}`);
        
        // Оновлюємо всі кнопки для відображення заброньованих місць
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.textContent === 'Забронювати') {
                button.textContent = 'Заброньовано';
                button.disabled = true;
            }
        });
    }
};
