import { ComponentAbstract } from '../ComponentsAbstract.js';

class Cabecalho extends ComponentAbstract{
  constructor() {
    super();
    const shadow = this.buildShadowDOM();

    shadow.appendChild(this.build());

    this.botaoSaida = shadow.querySelector('#logout');

    this.botaoSaida.addEventListener('click', this.sair.bind(this));
  }

  build(){
    const componentRoot = document.createElement("nav");
    componentRoot.setAttribute("class", "navbar navbar-expand-lg navbar-dark bg-dark");
    componentRoot.appendChild(this.buildContainer());

    return componentRoot;
  }

  buildContainer(){
    const container = document.createElement("div");
    container.setAttribute("class", "container-fluid");
    container.appendChild(this.buildCollpase());
    return container;
  }

  buildCollpase(){
    const collapse = document.createElement("div");
    collapse.setAttribute("class", "collapse navbar-collapse d-flex justify-content-end");
    collapse.setAttribute("id", "navbarNavDarkDropdown");

    collapse.appendChild(this.buildUl());

    return collapse;
  }

  buildUl(){
    const ul = document.createElement("ul");
    ul.setAttribute("class", "navbar-nav");
    ul.appendChild(this.buildLi());
    return ul;
  }

  buildLi(){
    const li = document.createElement("li");
    li.setAttribute("class", "nav-item dropdown");
    li.appendChild(this.buildSaida());
    return li;
  }

  buildSaida(){
    const saida = document.createElement("a");
    saida.setAttribute("class", "nav-link dropdown-toggle text-white");
    saida.setAttribute("href", "#");
    saida.setAttribute("id", "logout");
    saida.setAttribute("role", "button");
    saida.setAttribute("data-bs-toggle", "dropdown");
    saida.setAttribute("aria-haspopup", "true");
    saida.setAttribute("aria-expanded", "false");
    saida.textContent = "Sair";

    return saida;
  }

  async sair(event){
    event.preventDefault();

    localStorage.removeItem('loginResponse');
    window.location.href = '/login/login.html';

  }
}

customElements.define('cabecalho-component', Cabecalho);