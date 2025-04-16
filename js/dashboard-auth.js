import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBlwKso4qEDRK1SnhKxawP7Zm49BwcZz50",
  authDomain: "coworklyspace.firebaseapp.com",
  projectId: "coworklyspace",
  storageBucket: "coworklyspace.appspot.com",
  messagingSenderId: "1039847178271",
  appId: "1:1039847178271:web:9fbece3255c14b5217d52a"
};

// 1. Ініціалізація
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 2. Отримуємо DOM-елементи
const userEmail = document.getElementById("userEmail");
const goBackBtn = document.getElementById("goBackBtn");
const logoutLink = document.getElementById("logoutLink");

// 3. Слухаємо стан авторизації
onAuthStateChanged(auth, (user) => {
  console.log("onAuthStateChanged:", user);

  if (user && userEmail) {
    userEmail.textContent = user.email;
  } else {
    // 🛑 Не редиректи одразу, чекаємо, поки Firebase точно скаже
    // Але ми вже всередині onAuthStateChanged — значить можна чесно редиректити
    window.location.href = "auth.html";
  }
});

// 4. Кнопка "Назад"
if (goBackBtn) {
  goBackBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// 5. Кнопка "Вийти"
if (logoutLink) {
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    const confirmLogout = confirm("Ви дійсно хочете вийти з акаунта?");
    if (confirmLogout) {
      signOut(auth)
        .then(() => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert("Помилка при виході: " + error.message);
        });
    }
  });
}
