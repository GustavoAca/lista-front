async function authenticatedFetch(url, options = {}) {
  var urlCompleta = "http://localhost:8080" + url;

  if (urlCompleta.includes('/login') || urlCompleta.includes('/users')){
    return fetch(urlCompleta, options); 
  }

  const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
  if (!loginResponse) {
    window.location.href = 'index.html';
    return;
  }

  const expiresIn = loginResponse.expiresIn * 1000;
  const currentTime = Date.now();
  const expirationTime = currentTime + expiresIn;

  if (currentTime >= expirationTime) {
    localStorage.removeItem('loginResponse');
    window.location.href = 'index.html';
    return;
  }

  const headers = new Headers(options.headers || {});
  headers.append('Authorization', `Bearer ${loginResponse.accessToken}`);

  const response = await fetch(urlCompleta, { ...options, headers });

  if (response.status === 401) {
    localStorage.removeItem('loginResponse');
    window.location.href = 'index.html';
  }

  return response;
}

export { authenticatedFetch };