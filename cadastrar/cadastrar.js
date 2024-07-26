import { authenticatedFetch } from '../auth/authFetch.js';
import { isCamposValidos } from '../global/global.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('cadastroForm');
  const spinner = document.getElementById('loadingSpinner');
  const errorAlert = document.getElementById('errorAlert');
  const errorMessage = document.getElementById('errorMessage');

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;

    if(!isCamposValidos(username, password, errorMessage, errorAlert)){
        return;
    }

    loginForm.style.display = 'none';
    spinner.style.display = 'block';

    try {
      const response = await authenticatedFetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro desconhecido!');
      }

      window.location.href = '../index.html';
    } catch (error) {
      if (error.message === 'NetworkError when attempting to fetch resource.') {
        errorMessage.textContent = 'Sistema indisponível';
      } else {
        errorMessage.textContent = error.message;
      }

      errorAlert.style.display = 'block';

      setTimeout(() => {
        errorAlert.style.display = 'none';
      }, 5000);

      // Mostrar o formulário novamente
      loginForm.style.display = 'block';
    } finally {
      spinner.style.display = 'none';
    }
  });
});
