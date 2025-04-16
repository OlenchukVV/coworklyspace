import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// 🔥 Firebase конфіг
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

// 🎯 Отримуємо елементи
const userEmail = document.getElementById("userEmail");
const goBackBtn = document.getElementById("goBackBtn");
const logoutBtn = document.getElementById("logoutBtn"); // стара кнопка
const deleteAccountBtn = document.getElementById("deleteAccountBtn"); // нова кнопка

// 👤 Слухаємо користувача
onAuthStateChanged(auth, (user) => {
  if (user && userEmail) {
    userEmail.textContent = user.email;
  } else {
    window.location.href = "auth.html";
  }
});

// 🔙 Кнопка "Назад"
if (goBackBtn) {
  goBackBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// 🚪 Кнопка ВИХОДУ (якщо у тебе ще є стара кнопка logoutBtn)
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  });
}

// 🚪 Кнопка "Вийти з акаунта" (під формою)
if (deleteAccountBtn) {
  deleteAccountBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const confirmLogout = confirm("Вийти з акаунта?");
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
// ✅ Зміна пароля
const updatePasswordBtn = document.getElementById("updatePasswordBtn");
if (updatePasswordBtn) {
  updatePasswordBtn.addEventListener("click", () => {
    const newPasswordInput = document.getElementById("newPassword");
    const newPassword = newPasswordInput ? newPasswordInput.value : "";
    const user = auth.currentUser;

    if (user && newPassword) {
      user.updatePassword(newPassword).then(() => {
        alert("Пароль успішно змінено");
        newPasswordInput.value = "";
      }).catch((error) => {
        alert("❌ Помилка при зміні пароля: " + error.message);
      });
    }
  });
}

// ✅ Зміна email
const updateEmailBtn = document.getElementById("updateEmailBtn");
if (updateEmailBtn) {
  updateEmailBtn.addEventListener("click", () => {
    const newEmailInput = document.getElementById("newEmail");
    const newEmail = newEmailInput ? newEmailInput.value : "";
    const user = auth.currentUser;

    if (user && newEmail) {
      user.updateEmail(newEmail).then(() => {
        alert("Email успішно змінено");
        newEmailInput.value = "";
      }).catch((error) => {
        alert("❌ Помилка при зміні email: " + error.message);
      });
    }
  });
}
