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

const userGreeting = document.getElementById("userGreeting");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    userGreeting.textContent = `Вітаємо, ${user.email}!`;
    logoutBtn.style.display = "inline-block";
  } else {
    userGreeting.innerHTML = 'Ви не авторизовані. <a href="auth.html">Увійти</a>';
    logoutBtn.style.display = "none";
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("Ви вийшли.");
    location.reload();
  });
});