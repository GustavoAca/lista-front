import { ComponentAbstract } from '/src/components/ComponentsAbstract.js';
import { authenticatedFetch } from '/auth/authFetch.js';

class FormularioAbstract extends ComponentAbstract {
  constructor() {
    super();

    const shadow = this.buildShadowDOM();

    shadow.appendChild(this.build());


    this.form = shadow.querySelector('form');
    this.spinner = document.getElementById('loadingSpinner');
    this.avisoComponent = document.querySelector('aviso-component'); // Certifique-se que o AvisoComponent está fora do shadow DOM

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();

    const username = this.form.querySelector('#floatingInput').value;

    const password = this.form.querySelector('#floatingPassword').value;

    // Validação dos campos
    if (!this.isCamposValidos(username, password, this.avisoComponent.shadowRoot.querySelector('#errorMessage'), this.avisoComponent)) {
      return;
    }

    // Ocultar o formulário e exibir o spinner
    this.form.style.display = 'none';
    this.spinner.style.display = 'block';

    try {
      const response = await this.enviarRequisicao(username, password);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro desconhecido!');
      }

      const data = await response.json();
      if(data !== null){
        localStorage.setItem('loginResponse', JSON.stringify(data));
      }
      window.location.href = '/tela-inicial/tela-inicial.html';
    } catch (error) {
      this.definirMensagemExibicao(error);

      this.avisoComponent.show();
      this.ocultarMensagem();

      this.form.style.display = 'block';
    } finally {
      this.spinner.style.display = 'none';
    }
  }

  async enviarRequisicao(username, password){
    return await authenticatedFetch(this.getAttribute("requisicao"), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  }

  definirMensagemExibicao(error){
    const errorMessageElement = this.avisoComponent.shadowRoot.querySelector('#errorMessage');

      if (error.message === 'NetworkError when attempting to fetch resource.') {
        errorMessageElement.textContent = 'Sistema indisponível';
      } else {
        errorMessageElement.textContent = error.message || error;
      }
  }

  ocultarMensagem(){
    setTimeout(() => {
      this.avisoComponent.hide();
    }, 5000);
  }

  build() {
    const componentRoot = document.createElement("form");
    componentRoot.setAttribute("class", "formulario");

    componentRoot.appendChild(this.buildFormEmail());
    componentRoot.appendChild(this.buildFormPassword());
    const deveMostrarEsqueceuASenha = this.getAttribute("deveMostrarEsqueceuASenha");
    if(deveMostrarEsqueceuASenha){
      componentRoot.appendChild(this.buildEsqueceuASenha());
    }
   
    componentRoot.appendChild(this.buildBotao());

    return componentRoot;
  }

  buildFormEmail() {
    const emailAddress = document.createElement("div");
    emailAddress.setAttribute("class", "form-floating mb-3");

    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.placeholder = "name@example.com";
    inputEmail.setAttribute("id", "floatingInput");
    inputEmail.setAttribute("class", "form-control filled");

    const labelEmail = document.createElement("label");
    labelEmail.setAttribute("for", "floatingInput");
    labelEmail.setAttribute("class", "filled");
    labelEmail.textContent = "Email address";

    emailAddress.appendChild(inputEmail);
    emailAddress.appendChild(labelEmail);
    return emailAddress;
  }

  buildFormPassword() {
    const password = document.createElement("div");
    password.setAttribute("class", "form-floating mb-5");

    const inputPassword = document.createElement("input");
    inputPassword.type = "password";
    inputPassword.placeholder = "Password";
    inputPassword.setAttribute("id", "floatingPassword");
    inputPassword.setAttribute("class", "form-control");

    const labelPassword = document.createElement("label");
    labelPassword.setAttribute("for", "floatingPassword");
    labelPassword.setAttribute("class", "filled");

    labelPassword.textContent = "Password";

    password.appendChild(inputPassword);
    password.appendChild(labelPassword);
    return password;
  }

  buildEsqueceuASenha(){
    const esqueceuSenhaP = document.createElement("p");
    esqueceuSenhaP.setAttribute("class", "small mb-5 pb-lg-2");
    
    const esqueceuASenhaLink = document.createElement("a");
    esqueceuASenhaLink.setAttribute("class", "text-white-50");
    esqueceuASenhaLink.href = "#";
    esqueceuASenhaLink.textContent = "Esqueceu sua senha?";

    esqueceuSenhaP.appendChild(esqueceuASenhaLink);
    return esqueceuSenhaP;
  }

  buildBotao(){
    const botao = document.createElement("button");
    botao.type = "submit";
    botao.textContent = this.getAttribute("texto-botao");
    botao.setAttribute("class", "btn btn-outline-light btn-lg px-5 pb-lg-2");
    return botao;
  }

 isCamposValidos(username, password, errorMessage, errorAlert) {
    if(!this.isValido(username, password)){
      errorMessage.textContent = 'Username ou senha inválidos!';
      errorAlert.style.display = 'block';
    
      setTimeout(() => {
        errorAlert.style.display = 'none';
      }, 5000);
    
      return;
    }
    return true;
  }
  
  isValido(username, password) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(username) && password.length >= 4;
  }
}

customElements.define("formulario-inicial", FormularioAbstract);
