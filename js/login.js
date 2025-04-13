
import { auth, signInWithEmailAndPassword } from "./firebase.js";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("message").innerText = "Вхід успішний!";
  } catch (error) {
    document.getElementById("message").innerText = error.message;
  }
});
