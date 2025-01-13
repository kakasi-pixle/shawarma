function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Allow "shawarma" user to edit the page
  if (username === "shawarma" && password === "shawarmakl") {
    alert('Welcome, Shawarma! You can now edit the page.');
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid username or password!');
  }
}