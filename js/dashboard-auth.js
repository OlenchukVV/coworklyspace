import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const auth = getAuth();

const userEmail = document.getElementById("userEmail");
const goBackBtn = document.getElementById("goBackBtn");
const logoutLink = document.getElementById("logoutLink");

// 🔐 Перевірка, чи користувач авторизований
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmail.textContent = user.displayName || user.email;
  } else {
    window.location.href = "auth.html"; // редирект якщо не авторизований
  }
});

// 🔙 Кнопка "Назад" — повернення на головну
if (goBackBtn) {
  goBackBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// 🚪 Кнопка "Вийти з акаунта" — з підтвердженням
if (logoutLink) {
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    const confirmLogout = confirm("Ви дійсно хочете вийти з акаунта?");
    if (confirmLogout) {
      signOut(auth).then(() => {
        window.location.href = "index.html";
      });
    }
  });
}
