const mailInput = document.getElementById('mailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginPage = document.getElementById('loginPage');
const userPage = document.getElementById('userPage');
const logOutBtn = document.getElementById('logOut');
const optoutCheckbox = document.getElementById('checkbox');

const apiUrl = 'https://backend-newsletter.herokuapp.com';

userPage.style.display = 'none';

function storeSession(sessionId) {
  localStorage.setItem('id', sessionId);
}

function getSession() {
  let ses = localStorage.getItem('id');
  if (ses) {
    loginPage.style.display = 'none';
    userPage.style.display = 'block';
  }
}

//register

registerBtn.addEventListener('click', () => {
  let userLogin = {
    email: mailInput.value,
    password: passwordInput.value,
  };
  fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userLogin),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('success:', data);
    });
});

//login

loginBtn.addEventListener('click', () => {
  let userLogin = {
    email: mailInput.value,
    password: passwordInput.value,
  };
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userLogin),
  })
    .then((res) => res.json())
    .then((data) => {
      if ((data.status = 200)) {
        loginPage.style.display = 'none';
        userPage.setAttribute('style', 'display: block');
      }
      console.log('success:', data);
      storeSession(data.user._id);
    });
});

//optoutcheckbox button

logOutBtn.addEventListener('click', () => {
  fetch('http://localhost:3000/subscription', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      _id: localStorage.getItem('id'),
      subscribed: optoutCheckbox.checked,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  localStorage.removeItem('id');
  location.reload();
});

getSession();
