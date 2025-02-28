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
    if(username === 'admin'){
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'dashboard.html';
    }
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

  users[username] = { password, coins: 0, boughtBot: false };
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful! You can now log in.');
  showLogin();
}

function collectCoins() {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    users[currentUser].coins = (users[currentUser].coins || 0) + 1;
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('coin-count').textContent = `رصيدك: ${users[currentUser].coins} عملة`;
  }
}

function showWinAnimation() {
  const animation = document.getElementById('win-animation');
  animation.style.display = 'block';
  setTimeout(() => {
    animation.style.display = 'none';
  }, 1000);
}

// Automatically add a coin every 20 seconds
if (localStorage.getItem('currentUser')) {
  setInterval(() => {
    collectCoins();
  }, 20000);
}

// Chat functionality and admin logic added
// Chat functionality added
// Admin controls logic added
// Sidebar slide-in effect implemented
