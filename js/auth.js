
function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const user = { username, password };
    localStorage.setItem('user_' + username, JSON.stringify(user));
    alert('Реєстрація успішна!');
    window.location.href = 'login.html';
}

function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const storedUser = localStorage.getItem('user_' + username);
    if (!storedUser) return alert('Користувача не знайдено!');
    const user = JSON.parse(storedUser);
    if (user.password !== password) return alert('Невірний пароль!');
    localStorage.setItem('currentUser', username);
    window.location.href = 'dashboard.html';
}

function checkUser() {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        alert('Будь ласка, увійдіть');
        window.location.href = 'login.html';
    } else {
        document.getElementById('welcomeMsg').innerText = 'Вітаємо, ' + user + '!';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
