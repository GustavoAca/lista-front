import { ComponentAbstract } from "./ComponentsAbstract.js";

class Lista extends ComponentAbstract {
  constructor() {
    super();
    const shadow = this.buildShadowDOM();
    shadow.appendChild(this.build());
  }

  build(){
    const div = document.createElement("div");
    div.setAttribute("class", "d-flex w-100 justify-content-between align-items-center");
    div.appendChild(this.buildDivisao());
    div.appendChild(this.buildSpanTotalDosItems());
    return div;
  }

  buildSpanTotalDosItems() {
    const span = document.createElement("span");
    span.setAttribute("class", "badge text-bg-primary rounded-pill");
    let valorTotal = this.getAttribute("valorTotal");
    span.textContent = `Valor total: R$ ${valorTotal !== null ? valorTotal : 'Não disponível'}`;
    return span;
  }

  buildDivisao() {
    const divisao = document.createElement("div");
    divisao.setAttribute("class", "d-flex flex-column align-center");
    divisao.appendChild(this.buildRealizada());
    return divisao;
  }

  buildRealizada() {
    const realizada = document.createElement("h5");
    realizada.setAttribute("class", "mb-1");
    realizada.textContent = `Realizada em: ${this.formatDate(this.getAttribute("dataCompra"))}`;
    return realizada;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são 0-baseados
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
}

customElements.define('lista-component', Lista);