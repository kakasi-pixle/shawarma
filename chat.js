// التأكد من تسجيل الدخول
const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
  window.location.href = 'index.html';
}

const users = JSON.parse(localStorage.getItem('users')) || {};
const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const coinCount = document.getElementById('coinCount');
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// تحديث عرض العملات
function updateCoins() {
  coinCount.textContent = `Coins: ${users[currentUser].coins}`;
}

// عرض الرسائل في الشات
function renderMessages() {
  chatBox.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'chat-message';
    div.textContent = `${msg.sender}: ${msg.text}`;
    chatBox.appendChild(div);
  });
}

// إرسال رسالة جديدة
function sendMessage() {
  const text = messageInput.value.trim();
  if (text !== '') {
    messages.push({ sender: currentUser, text });
    localStorage.setItem('messages', JSON.stringify(messages));
    renderMessages();
    messageInput.value = '';
  }
}

updateCoins();
renderMessages();
