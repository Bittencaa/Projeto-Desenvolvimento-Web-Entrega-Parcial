const itensContainer = document.querySelector("#grid");
const cartContent = document.querySelector("#cart-content");
const clearCartBtn = document.querySelector("#clear-cart");
const checkoutBtn = document.querySelector("#checkout-btn");
const totalPriceContainer = document.querySelector("#total-price");

function getLSContent() {
  // pega o conteúdo do local storage
  // se não tiver nenhum conteúdo, cria um array vazio
  const lsContent = JSON.parse(localStorage.getItem("itens")) || [];
  return lsContent;
}

function setLSContent(lsContent) {
  // salva o conteúdo dentro do local storage
  localStorage.setItem("itens", JSON.stringify(lsContent));
}

function calculateTotal(prices) {
  // calcula o preço total dos itens no carrinho
  return prices.reduce(function (prev, next) {
    return prev + next;
  }, 0);
}

function getCartItemPrices() {
  // extrai os preços dos itens no carrinho para calcular o total
  const prices = [];
  // recupera o elemento td onde o preço do ingresso está armazenado para cada item no carrinho
  let nums = cartContent.querySelectorAll("tr td:nth-child(2)");
  let qttt = cartContent.querySelectorAll("tr td:nth-child(3)");

  // itera sobre cada td e extrai o preço, removendo o símbolo de R$ do texto,
  // transformando a string em um número e armazenando o valor no array criado
  if (nums.length > 0) {
    for (let cell = 0; cell < nums.length; cell++) {
      let num = nums[cell].innerText;
      let qtt = qttt[cell].innerText;
      num = num.replace(/[^\d.]/g, "");
      num = parseFloat(num);
      qtt = parseInt(qtt);
      prices.push(num*qtt);
    }
    // retorna o array de preços
    return prices;
  } else {
    return;
  }
}

  function displayCartTotal() {
    // mostra o custo total no carrinho
    const prices = getCartItemPrices();
    let total = 0;
    if (prices) {
      total = calculateTotal(prices);
      totalPriceContainer.innerHTML = `<span class="total" style="color: #f0f0f0;">Total: R$${total.toFixed(
        2
      )}</span>`;
    } else {
      totalPriceContainer.innerHTML = '<span class="total" style="color: #f0f0f0;">Total: R$0</span>';
    }
  }

  function displayItens() {
    // mostra todos os itens no carrinho

    // pega o conteúdo do local storage
    const lsContent = getLSContent();
    let itemMarkup = "";
    // se local storage não estiver vazio, monta a tabela dos itens no carrinho com seus detalhes
    if (lsContent !== null) {
      for (let item of lsContent) {
        itemMarkup += `
            <tr>
            <td>
              ${item.name}
            </td>
            <td>${item.price}</td>
            <td>${item.qtd}</td>
            <td><a href="#" data-id="${item.id}" style="text-decoration: none;"
            class="remove">X</a></td>
            </tr>
          `;
      }
    } else {
      itemMarkup = "";
    }
    cartContent.querySelector("tbody").innerHTML = itemMarkup;
  }

function saveItem(clickedBtn) {
  // salva o item selecionado no local storage e o mostra dentro do carrinho

  const itemId = clickedBtn.getAttribute("data-id");
  const cardInfo = clickedBtn.parentElement;
  const itemName = cardInfo.querySelector("h4").textContent;
  const itemPrice = cardInfo.querySelector(".card__price").textContent;
  const itemQtd = cardInfo.querySelector(".card__qtd").value;

  let isItemInCart = false;

  // pega o array do local storage
  const lsContent = getLSContent();

  // verifica se o item já existe no LS antes de adicioná-lo ao carrinho, evitando itens duplicados
  lsContent.forEach(function (item) {
    if (item.id === itemId) {
      alert("Esse item já está no seu carrinho.");
      isItemInCart = true;
    }
  });

  // apenas se o item ainda não estiver no carrinho, cria-se um objeto representando as informações do
  // item selecionado e o armazena no array do LS
  if (!isItemInCart) {
    lsContent.push({
      id: itemId,
      name: itemName,
      price: itemPrice,
      qtd: itemQtd
    });

    // adiciona item no LS
    setLSContent(lsContent);
  }
}

function removeItem(itemId) {
  // remove item do carrinho (e do local storage)

  // recupera lista de itens do LS
  const lsContent = getLSContent();

  // pega o índice do item selecionado para removê-lo do array com conteúdo do LS
  let itemIndex;
  lsContent.forEach(function (item, i) {
    if (item.id === itemId) {
      itemIndex = i;
    }
  });

  // modifica os itens no array do LS para remover o item selecionado
  lsContent.splice(itemIndex, 1);
  // atualiza o conteúdo do local storage
  setLSContent(lsContent);

  displayItens();
}

function clearCart() {
  // limpa todos os itens do carrinho (e do local storage)

  // recupera lista de itens do LS
  const lsContent = getLSContent();
  // array vazia no local storage
  lsContent.splice(0, lsContent.length);
  // atualiza o local storage
  setLSContent(lsContent);
  // mostra o conteúdo no carrinho
  displayItens();
}

function checkout() {
  const cartItens = cartContent.querySelector("tbody").innerHTML;
  if (cartItens !== "" && confirm("Realizar checkout?")) {
    clearCart();
    window.location.href = "compra.html"
  } else {
    return;
  }
}

// salva item no carrinho e no LS quando o botão "add-to-cart" é clicado
itensContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    e.preventDefault();
    const clickedBtn = e.target;
    saveItem(clickedBtn);
  }
});

// verifica se cartContent não retorna valor null, anter de adicionar um event listener
if (cartContent) {
  // Carregamento de página:
  document.addEventListener("DOMContentLoaded", function (e) {
    displayItens();
    displayCartTotal();
  });

  // liga a função removeItem a um evento click event da tabela cartContent
  cartContent.querySelector("tbody").addEventListener("click", function (e) {
    e.preventDefault();
    // identifica o botão que foi clicado
    const clickedBtn = e.target;
    // se for um botão de remoção
    if (e.target.classList.contains("remove")) {
      // pega o valor da propriedade data-id, que contém o id do item selecionado
      const itemId = clickedBtn.getAttribute("data-id");
      // usa o id para remover o item selecionado do carrinho
      removeItem(itemId);
      // ajusta o custo total no carrinho
      displayCartTotal();
    }
  });

  // liga as funções clearCart e displayCartTotal a um evento de click do botão clearCartBtn
  clearCartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    clearCart();
  });
  clearCartBtn.addEventListener("click", displayCartTotal);

  // liga as funções checkout e displayCartTotal a um evento de click do botão checkoutBtn
  checkoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    checkout();
  });
  checkoutBtn.addEventListener("click", displayCartTotal);
}
