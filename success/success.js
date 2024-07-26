document.addEventListener('DOMContentLoaded', function () {
  const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));

  if (!loginResponse) {
    window.location.href = 'index.html';
    return;
  }

  const expiresIn = loginResponse.expiresIn * 1000;
  const currentTime = Date.now();
  const expirationTime = currentTime + expiresIn;

  const timeRemaining = expirationTime - currentTime;

  document.getElementById('expiresIn').textContent = new Date(expirationTime).toLocaleString();
  document.getElementById('timeRemaining').textContent = timeRemaining > 0 ? `${Math.floor(timeRemaining / 1000)} segundos` : 'Expirado';
});

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');

  logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('loginResponse');
    window.location.href = '../index.html';
  });
});