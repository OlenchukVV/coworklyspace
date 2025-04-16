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
// Показати форму зміни пароля
const changePasswordLink = document.getElementById("changePasswordLink");
const passwordChangeSection = document.getElementById("passwordChangeSection");

if (changePasswordLink && passwordChangeSection) {
  changePasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    passwordChangeSection.style.display = "block";
    emailUpdateSection.style.display = "none";
  });
}

// Показати форму оновлення email
const updateEmailLink = document.getElementById("updateEmailLink");
const emailUpdateSection = document.getElementById("emailUpdateSection");

if (updateEmailLink && emailUpdateSection) {
  updateEmailLink.addEventListener("click", (e) => {
    e.preventDefault();
    emailUpdateSection.style.display = "block";
    passwordChangeSection.style.display = "none";
  });
}
// ✅ Зміна пароля
const updatePasswordBtn = document.getElementById("updatePasswordBtn");
if (updatePasswordBtn) {
  updatePasswordBtn.addEventListener("click", () => {
    const newPassword = document.getElementById("newPassword").value;
    const user = auth.currentUser;

    if (user && newPassword) {
      user.updatePassword(newPassword).then(() => {
        alert("Пароль успішно змінено");
        document.getElementById("newPassword").value = "";
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
    const newEmail = document.getElementById("newEmail").value;
    const user = auth.currentUser;

    if (user && newEmail) {
      user.updateEmail(newEmail).then(() => {
        alert("Email успішно змінено");
        document.getElementById("newEmail").value = "";
      }).catch((error) => {
        alert("❌ Помилка при зміні email: " + error.message);
      });
    }
  });
}

