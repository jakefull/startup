// function login() {
//     const nameEl = document.querySelector("#name");
//     localStorage.setItem("userName", nameEl.value);
//     window.location.href = "play.html"; //shouldn't this be type.html?
//   }
(async () => { //this fxn is called right away
  let authenticated = false;
  const userName = localStorage.getItem('userName');
  if (userName) {
    const nameEl = document.querySelector('#userName');
    nameEl.value = userName;
    const user = await getUser(nameEl.value);
    authenticated = user?.authenticated;
  }

  if (authenticated) {
    document.querySelector('#playerName').textContent = userName; //see index.html
    setDisplay('loginControls', 'none');
    setDisplay('playControls', 'block');
  } else {
    setDisplay('loginControls', 'block');
    setDisplay('playControls', 'none');
  }
})();

async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const userName = document.querySelector('#userName')?.value;
  const password = document.querySelector('#password')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const body = await response.json();
  //delete this
  console.log(response);

  if (response?.status === 200) {
    localStorage.setItem('userName', userName);
    window.location.href = 'type.html'; //THIS ISN'T BEING CALLED!
  } else {
    const modalEl = document.querySelector('#errorBox');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const errorBox = new bootstrap.Modal(modalEl, {});
    errorBox.show();
  }
}

function play() {
  window.location.href = 'type.html';
}

function logout() {
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

async function getUser(email) {
  let scores = [];
  const response = await fetch(`/api/user/${email}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

function setDisplay(controlId, display) { //what does this do?
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
}
