async function authenticatedFetch(url, options = {}) {
  const urlLogin = '../login/login.html';
  const urlCompleta = "http://localhost:8080" + url;

  if (urlCompleta.includes('/login') || urlCompleta.includes('/users')) {
    return fetch(urlCompleta, options); 
  }

  const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
  
  if (!loginResponse) {
    window.location.href = urlLogin;
    return;
  }

  const expiresIn = loginResponse.expiresIn * 1000;
  const currentTime = Date.now();
  const expirationTime = currentTime + expiresIn;

  if (currentTime >= expirationTime) {
    localStorage.removeItem('loginResponse');
    window.location.href = urlLogin;
    return;
  }

  const headers = new Headers(options.headers || {});
  headers.append('Authorization', `Bearer ${loginResponse.accessToken}`);

  try {
    const response = await fetch(urlCompleta, { ...options, headers });

    if (response.status === 401) {
      localStorage.removeItem('loginResponse');
      window.location.href = urlLogin;
    }

    return response;
  } catch (error) {
  }
}

export { authenticatedFetch };
