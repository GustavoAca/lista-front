import { ComponentAbstract } from "../ComponentsAbstract.js";

class AvisoComponent extends ComponentAbstract {
  constructor() {
    super();
    const shadow = this.buildShadowDOM();
    shadow.appendChild(this.build());
  }

  build() {
    const componentRoot = document.createElement("div");
    componentRoot.setAttribute("id", "errorAlert");
    componentRoot.setAttribute("class", "alert alert-gray alert-dismissible fade show position-relative p-2 m-2");
    componentRoot.setAttribute("role", "alert");

    const errorMessage = document.createElement("span");
    errorMessage.setAttribute("id", "errorMessage");

    componentRoot.appendChild(errorMessage);

    return componentRoot;
  }

  show() {
    const avisoElement = this.shadowRoot.querySelector('#errorAlert');
    if (avisoElement) {
      avisoElement.style.display = 'block';
    } else {
      console.error('Elemento .aviso não encontrado no Shadow DOM');
    }
  }

  hide() {
    const avisoElement = this.shadowRoot.querySelector('#errorAlert');
    if (avisoElement) {
      avisoElement.style.display = 'none';
    } else {
      console.error('Elemento .aviso não encontrado no Shadow DOM');
    }
  }
}

customElements.define("aviso-component", AvisoComponent);