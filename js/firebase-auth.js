
const firebaseConfig = {
    apiKey: "AIzaSyBWwKso4qEdRK1SnWHxawP7Zm49BwcZz50",
    authDomain: "coworklyspace.firebaseapp.com",
    projectId: "coworklyspace",
    storageBucket: "coworklyspace.appspot.com",
    messagingSenderId: "1039847178271",
    appId: "1:1039847178271:web:9fbece3255c14b5217d52a"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.getElementById("message").innerText = "Реєстрація успішна!";
        })
        .catch((error) => {
            document.getElementById("message").innerText = error.message;
        });
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.getElementById("message").innerText = "Вхід успішний!";
        })
        .catch((error) => {
            document.getElementById("message").innerText = error.message;
        });
}
