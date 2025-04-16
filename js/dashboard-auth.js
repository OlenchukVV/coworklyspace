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

// 👇 Додаємо кнопку назад
const goBackBtn = document.getElementById("goBackBtn");

if (goBackBtn) {
  goBackBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

const auth = getAuth(app);

// кнопка "Назад"
const goBackBtn = document.getElementById("goBackBtn");
if (goBackBtn) {
  goBackBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// кнопка "Вийти з акаунта"
const deleteAccountBtn = document.getElementById("deleteAccountBtn");
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


const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmail.textContent = user.email;
  } else {
    window.location.href = "auth.html";
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});
