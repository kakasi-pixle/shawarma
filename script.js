
function showLogin() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[username] && users[username].password === password) {
    localStorage.setItem('currentUser', username);
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid username or password!');
  }
}

function register() {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  if (!username || !password) {
    alert('Please fill in all fields.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[username]) {
    alert('Username already exists. Please choose another one.');
    return;
  }

  users[username] = { password, coins: 0 };
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful! You can now log in.');
  showLogin();
}
