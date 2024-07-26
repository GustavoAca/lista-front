document.addEventListener('DOMContentLoaded', function () {
  const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));

  if (!loginResponse) {
      window.location.href = '../login/login.html';
      return;
  }

  // Calcula o tempo de expiração
  const expiresIn = loginResponse.expiresIn * 1000; // Converte segundos para milissegundos
  const expirationTime = Date.now() + expiresIn; // Tempo de expiração no futuro

  function updateCountdown() {
      const currentTime = Date.now();
      const timeRemaining = expirationTime - currentTime;

      if (timeRemaining <= 0) {
          document.getElementById('timeRemaining').textContent = 'Expirado';
          clearInterval(interval); // Para a contagem regressiva
          return;
      }

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      document.getElementById('timeRemaining').textContent = 
          `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // Atualiza a contagem regressiva a cada segundo
  const interval = setInterval(updateCountdown, 1000);

  // Atualiza a contagem regressiva imediatamente ao carregar
  updateCountdown();
});


document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');

  logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('loginResponse');
    window.location.href = '../login/login.html';
  });
});