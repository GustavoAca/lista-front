import { authenticatedFetch } from '/auth/authFetch.js';

document.addEventListener("DOMContentLoaded", () => {
  const botaoCarrinhoDeCompra = document.getElementById('carrinhoDeCompra');

  botaoCarrinhoDeCompra.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '../carrinho-de-compra/carrinho-de-compra.html';
  })
})

document.addEventListener("DOMContentLoaded", async function () {

  try {
    const response = await authenticatedFetch('/compras/listar', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Erro desconhecido!');
    }

    const data = await response.json();
    const itemList = document.getElementById('compra-list');

    // Acessa a lista de compras dentro do campo "content"
    const compras = data.content;

    // Limpa a lista atual
    itemList.innerHTML = '';

    compras.forEach(compra => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      const dataFormatada = formatDate(compra.createdDate)
      // Cria a estrutura do item da compra
      listItem.innerHTML = `
      <div class="d-flex w-100 justify-content-between align-items-center">
    <div class="d-flex flex-column">
        <h5 class="mb-1">Realizada em: ${dataFormatada}</h5>
        <span class="badge badge-primary badge-pill">${compra.items.length} items</span>
    </div>
    <span class="badge text-bg-primary rounded-pill">Valor Total: R$ ${compra.valorTotal !== null ? compra.valorTotal.toFixed(2) : 'Não disponível'}</span>
    </div>
      `;

      itemList.appendChild(listItem);
    });

  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let currentPage = 0;
  const pageSize = 20;
  const itemList = document.getElementById('compra-list');
  const loadingIndicator = document.createElement('div');
  loadingIndicator.innerHTML = `
  <div class="spinner-grow" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
`;
  loadingIndicator.style.textAlign = 'center';
  loadingIndicator.style.padding = '20px';
  let isLoading = false;

  async function fetchData(page) {
    if (isLoading) return;
    isLoading = true;

    try {
      const response = await authenticatedFetch(`/compras/listar?page=${page}&size=${pageSize}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro desconhecido!');
      }

      const data = await response.json();
      console.log(data.content)
      const compras = data.content;

      // Remove o indicador de carregamento se já estiver presente
      if (itemList.contains(loadingIndicator)) {
        itemList.removeChild(loadingIndicator);
      }

      // Limpa a lista se for a primeira página
      if (page === 0) {
        itemList.innerHTML = '';
      }

      if (compras.length > 0) {
        compras.forEach(compra => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item';
          const listaComponent = document.createElement('lista-component');

          listaComponent.setAttribute('dataCompra', compra.createdDate);
          listaComponent.setAttribute('valorTotal', compra.valorTotal);

          listItem.appendChild(listaComponent);

          itemList.appendChild(listItem);
        });

        if (compras.length === pageSize) {
          itemList.appendChild(loadingIndicator);
        }

        currentPage++;
      }

    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    } finally {
      isLoading = false;
    }
  }

  function onScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchData(currentPage);
    }
  }

  window.addEventListener('scroll', onScroll);

  // Carrega os dados da página inicial
  fetchData(currentPage);
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são 0-baseados
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}