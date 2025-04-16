import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// 🔥 Твій Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBlwKso4qEDRK1SnhKxawP7Zm49BwcZz50",
  authDomain: "coworklyspace.firebaseapp.com",
  projectId: "coworklyspace",
  storageBucket: "coworklyspace.appspot.com",
  messagingSenderId: "1039847178271",
  appId: "1:1039847178271:web:9fbece3255c14b5217d52a"
};

// ✅ Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ⛓️ Вибираємо елементи
const userEmail = document.getElementById("userEmail");
const goBackBtn = document.getElementById("goBackBtn");
const logoutLink = document.getElementById("logoutLink");

// 👁️ Діагностика
console.log("Очікуємо перевірку користувача...");

// ✅ Перевірка авторизації
onAuthStateChanged(auth, (user) => {
  console.log("onAuthStateChanged спрацювало");
  console.log("user:", user);
  console.log("auth.currentUser:", auth.currentUser);

  if (user && userEmail) {
    userEmail.textContent = user.email;
  } else {
    setTimeout(() => {
      if (!auth.currentUser) {
        console.log("Користувач не авторизований — редирект");
        window.location.href = "auth.html";
      }
    }, 300);
  }
});

// 🔙 Кнопка "Назад"
if (goBackBtn) {
  goBackBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// 🚪 Кнопка "Вийти з акаунта"
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
