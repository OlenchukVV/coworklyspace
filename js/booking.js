import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";

// Твоя конфігурація
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
const db = getDatabase(app);

// Кнопка бронювання
const reserveButton = document.getElementById('reserveButton');

if (reserveButton) {
  reserveButton.addEventListener('click', () => {
    const user = auth.currentUser;
    if (!user) return alert("Увійдіть у свій акаунт");

    const bookingData = {
      location: "Freedom Hub",
      date: "2025-04-14",
      time: "10:00",
      bookedAt: new Date().toISOString()
    };

    const bookingRef = ref(db, `bookings/${user.uid}`);
    push(bookingRef, bookingData)
      .then(() => alert("✅ Заброньовано!"))
      .catch((err) => alert("❌ Помилка: " + err.message));
  });
}
