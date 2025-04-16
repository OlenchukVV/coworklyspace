import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const auth = getAuth();

const userEmail = document.getElementById("userEmail");
const goBackBtn = document.getElementById("goBackBtn");
const logoutLink = document.getElementById("logoutLink");

onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmail.textContent = user.displayName || user.email;
  } else {
    window.location.href = "auth.html";
  }
});

if (goBackBtn) {
  goBackBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

if (logoutLink) {
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  });
}
