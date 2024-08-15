export class ComponentAbstract extends HTMLElement {
  constructor() {
    super();
  }

  buildShadowDOM() {
    const shadow = this.attachShadow({ mode: "open" });
<<<<<<< HEAD
    const bootstrapLink = document.createElement('link');
    bootstrapLink.setAttribute('rel', 'stylesheet');
    bootstrapLink.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
    shadow.appendChild(bootstrapLink);

    const styleGlobal = document.createElement('link');
    styleGlobal.setAttribute('rel', 'stylesheet');
    styleGlobal.setAttribute('href', '../../global/global.css');
    shadow.appendChild(styleGlobal);

    const bootstrapScript = document.createElement('script');
    bootstrapScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js');
    shadow.appendChild(bootstrapScript);
=======
    shadow.innerHTML = `
      <link rel="stylesheet" href="/global/global.css">
    `;
>>>>>>> 90efc973907ec72868c5b019662987374e49d449
    return shadow;
  }
}
