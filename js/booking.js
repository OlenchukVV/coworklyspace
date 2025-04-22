
import { auth, createUserWithEmailAndPassword } from "./firebase.js";

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    document.getElementById("message").innerText = "Успішна реєстрація!";
  } catch (error) {
    document.getElementById("message").innerText = error.message;
  }
});
