export class ComponentAbstract extends HTMLElement {
  constructor() {
    super();
  }

  buildShadowDOM() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <link rel="stylesheet" href="/global/global.css">
    `;
    return shadow;
  }
}
