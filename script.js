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

  // التحقق من بيانات الأدمن
  if(username === 'yhyaglx'){
    if(password === 'smliglx'){
      if(!users[username]){
         users[username] = { password, coins: 0, boughtBot: false, purchases: [] };
         localStorage.setItem('users', JSON.stringify(users));
      }
      localStorage.setItem('currentUser', username);
      window.location.href = 'admin.html';
      return;
    } else {
      alert('بيانات الأدمن غير صحيحة!');
      return;
    }
  }

  // تسجيل الدخول للمستخدمين العاديين
  if(users[username] && users[username].password === password) {
    localStorage.setItem('currentUser', username);
    window.location.href = 'dashboard.html';
  } else {
    alert('اسم المستخدم أو كلمة المرور غير صحيحة!');
  }
}

function register() {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  if(!username || !password) {
    alert('يرجى ملء جميع الحقول.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};
  if(users[username]) {
    alert('اسم المستخدم موجود بالفعل. اختر اسم آخر.');
    return;
  }

  users[username] = { password, coins: 0, boughtBot: false, purchases: [] };
  localStorage.setItem('users', JSON.stringify(users));
  alert('تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.');
  showLogin();
}

function collectCoins() {
  const currentUser = localStorage.getItem('currentUser');
  if(!currentUser) return;
  const now = Date.now();
  const cooldown = 20000; // 20 ثانية
  const lastCoinTime = localStorage.getItem('lastCoinTime_' + currentUser);
  if(lastCoinTime && now - lastCoinTime < cooldown) {
    const remaining = Math.ceil((cooldown - (now - lastCoinTime)) / 1000);
    alert(`انتظر ${remaining} ثانية قبل تجميع عملة جديدة`);
    return;
  }
  const users = JSON.parse(localStorage.getItem('users')) || {};
  users[currentUser].coins = (users[currentUser].coins || 0) + 1;
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('coinCount').textContent = `رصيدك: ${users[currentUser].coins} عملة`;
  localStorage.setItem('lastCoinTime_' + currentUser, now);
}

function showWinAnimation() {
  const animation = document.getElementById('win-animation');
  animation.style.display = 'block';
  setTimeout(() => {
    animation.style.display = 'none';
  }, 1000);
}
