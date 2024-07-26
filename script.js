import { authenticatedFetch } from './auth/authFetch.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const spinner = document.getElementById('loadingSpinner');
    const errorAlert = document.getElementById('errorAlert');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('floatingInput').value;
        const password = document.getElementById('floatingPassword').value;

        loginForm.style.display = 'none';
        spinner.style.display = 'block';

        try {
            const response = await authenticatedFetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Erro desconhecido!');
            }

            const data = await response.json();
            localStorage.setItem('loginResponse', JSON.stringify(data));
            window.location.href = './success/success.html';
        } catch (error) {
            console.error('Error:', error);

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
