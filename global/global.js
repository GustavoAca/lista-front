function isCamposValidos(username, password, errorMessage, errorAlert) {
  if(!isValido(username, password)){
    errorMessage.textContent = 'Username ou senha inválidos!';
    errorAlert.style.display = 'block';
  
    setTimeout(() => {
      errorAlert.style.display = 'none';
    }, 5000);
  
    return;
  }
  return true;
}

function isValido(username, password) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(username) && password.length >= 4;
}



export { isCamposValidos };