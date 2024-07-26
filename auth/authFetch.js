async function authenticatedFetch(url, options = {}) {
  var urlCompleta = "http://localhost:8080" + url;

  // Verifica se a URL é '/login' e não faz verificação de token
  if (urlCompleta.includes('/login') || urlCompleta.includes('/users')){
    return fetch(urlCompleta, options); // Faz a requisição normalmente sem adicionar o token
  }

  // Caso não seja '/login', realiza a verificação do token
  const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
  if (!loginResponse) {
    window.location.href = 'index.html'; // Redirecionar se não houver dados
    return;
  }

  const expiresIn = loginResponse.expiresIn * 1000;
  const currentTime = Date.now();
  const expirationTime = currentTime + expiresIn;

  if (currentTime >= expirationTime) {
    localStorage.removeItem('loginResponse');
    window.location.href = 'index.html'; // Redirecionar se o token estiver expirado
    return;
  }

  // Adicionar o token ao cabeçalho da requisição
  const headers = new Headers(options.headers || {});
  headers.append('Authorization', `Bearer ${loginResponse.accessToken}`);

  const response = await fetch(urlCompleta, { ...options, headers });

  if (response.status === 401) {
    localStorage.removeItem('loginResponse');
    window.location.href = 'index.html'; // Redirecionar se a resposta for não autorizado
  }

  return response;
}

export { authenticatedFetch };