const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
  window.location.href = 'index.html';
}

const users = JSON.parse(localStorage.getItem('users')) || {};
const chatBox = document.getElementById('chatBox');
const coinCount = document.getElementById('coinCount');
let messages = JSON.parse(localStorage.getItem('messages')) || [];

function updateCoins() {
  coinCount.textContent = `Coins: ${users[currentUser].coins}`;
}

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();

  if (message) {
    messages.push({ sender: currentUser, text: message });
    localStorage.setItem('messages', JSON.stringify(messages));
    renderMessages();
    messageInput.value = '';
  }
}

function sendCoin() {
  if (users[currentUser].coins > 0) {
    messages.push({ sender: currentUser, text: '🎉 Sent a coin!' });
    users[currentUser].coins--;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('messages', JSON.stringify(messages));
    updateCoins();
    renderMessages();
  } else {
    alert('You don’t have enough coins!');
  }
}

function renderMessages() {
  chatBox.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.textContent = `${msg.sender}: ${msg.text}`;
    chatBox.appendChild(div);
  });
}

updateCoins();
renderMessages();

// Donations and emoji effects
function handleDonation(amount) {
  let message = '';
  if (amount === 5) {
      message = '🎉 تأثير بسيط 🎉';
  } else if (amount === 10) {
      message = '🎊 تأثير متوسط 🎊';
  } else if (amount === 20) {
      message = '🎆 تأثير مميز 🎆';
  } else if (amount === 30) {
      message = '✨✨ أقوى تأثير ✨✨';
  }
  alert(message);
}

// تمت إزالة وظيفة شراء البوت من الشات حسب الطلب
