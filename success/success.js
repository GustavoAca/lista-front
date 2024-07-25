document.addEventListener('DOMContentLoaded', function () {
  const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
  console.log('Dados lidos do localStorage:', loginResponse); // Inspecione os dados lidos

  if (!loginResponse) {
    window.location.href = 'index.html'; // Redirecionar para a página de login se não houver dados
    return;
  }

  const expiresIn = loginResponse.expiresIn * 1000; // Converter para milissegundos
  const currentTime = Date.now();
  const expirationTime = currentTime + expiresIn; // Tempo atual + tempo de expiração

  const timeRemaining = expirationTime - currentTime; // Tempo restante até a expiração

  // Atualizar o DOM com o tempo de expiração e o tempo restante
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