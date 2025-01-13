const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
  window.location.href = 'index.html';
}

const users = JSON.parse(localStorage.getItem('users')) || {};
const chatBox = document.getElementById('chatBox');
const coinCount = document.getElementById('coinCount');
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// Adding function to handle coin accumulation every 20 seconds
setInterval(() => {
  users[currentUser].coins += 2;
  localStorage.setItem('users', JSON.stringify(users));
  updateCoins();
}, 20000);

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
  const coinAmount = prompt("Enter number of coins to send:");
  if (coinAmount && !isNaN(coinAmount) && coinAmount > 0) {
    if (users[currentUser].coins >= coinAmount) {
      messages.push({
        sender: currentUser,
        text: `Sent ${coinAmount} coin(s)!`,
        isCoinTransfer: true,
        coinAmount: coinAmount
      });
      users[currentUser].coins -= coinAmount;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('messages', JSON.stringify(messages));
      updateCoins();
      renderMessages();
    } else {
      alert('Not enough coins!');
    }
  }
}

function renderMessages() {
  chatBox.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    if (msg.isCoinTransfer) {
      div.textContent = `${msg.sender} has sent ${msg.coinAmount} coin(s)!`;
      div.style.color = 'gold';
    } else {
      div.textContent = `${msg.sender}: ${msg.text}`;
    }
    chatBox.appendChild(div);
  });
}

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('open');
}

updateCoins();
renderMessages();
