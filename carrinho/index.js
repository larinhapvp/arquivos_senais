document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o carrinho a partir do localStorage ou cria um carrinho vazio
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const listaCarrinho = document.getElementById("lista-carrinho");
    const totalCarrinho = document.getElementById("total-carrinho");
    const botaoLimparCarrinho = document.getElementById("limparCarrinho");

    // Atualiza o carrinho na página
    function atualizarCarrinho() {
        listaCarrinho.innerHTML = "carrinho"; // Limpa a lista antes de recriá-la
        let total = 0;

        carrinho.forEach(item => {
            const li = document.createElement("li");
            console.log(`${item.nome} - $${item.preco.toFixed(2)}`);
            li.textContent = `${item.nome} - $${item.preco.toFixed(2)}`;
            listaCarrinho.appendChild(li);
            total = total + item.preco;
        });

        totalCarrinho.textContent = total.toFixed(2);
    }



    // Adiciona um item ao carrinho
    function adicionarAoCarrinho(nome, preco) {
        const item = { nome, preco };
        carrinho.push(item);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarCarrinho();
    }

    // Limpa o carrinho
    function limparCarrinho() {
        carrinho = []; // Esvazia o carrinho
        localStorage.removeItem("carrinho");
        atualizarCarrinho();
    }

    // Adiciona evento de clique aos botões "Adicionar ao Carrinho"
    const botoesAdicionar = document.querySelectorAll(".produto button.adicionar");
    botoesAdicionar.forEach(botao => {
        botao.addEventListener("click", () => {
            const produto = botao.parentElement;
            const nomeProduto = produto.querySelector("h5").textContent;
            const precoProduto = parseFloat(produto.querySelector("p").textContent);
            adicionarAoCarrinho(nomeProduto, precoProduto);
        });
    });


    // Inicializa o carrinho na página
    atualizarCarrinho();
});





function buscarCep() {
    var cep = document.getElementById("cep").value;
  
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
  
        var resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = `
                <p>CEP: ${cep}</p>
                <p>Logradouro: ${data.logradouro || 'Não encontrado'}</p>
                <p>Bairro: ${data.bairro || 'Não encontrado'}</p>
                <p>Cidade: ${data.localidade || 'Não encontrado'}</p>
                <p>Estado: ${data.uf || 'Não encontrado'}</p>`;
  
                calcularFrete();
  
      })
      .catch(error => {
        console.error("Erro ao consultar o CEP:", error);
      });
  }
  
  function calcularFrete() {
    var cep = document.getElementById("cep").value;
  
    fetch(`https://www.cepcerto.com/ws/json-frete/01001000/${cep}/1000/50/40/30`)
      .then(response => response.json())
      .then(data => {
  
        var resultadoDiv = document.getElementById("resultado2");
        resultadoDiv.innerHTML = `
                <p>valor do sedex: R$ ${data.valorsedex || 'Não encontrado'}</p>
               
                <p>  prazo do sedex: ${data.prazosedex || 'Não encontrado'}</p>
  
                <p>  valor do pac: R$${data.valorpac || 'Não encontrado'}</p>
  
                <p>  prazop do sedex: ${data.prazopac || 'Não encontrado'}</p>`;
  
      })
      .catch(error => {
        console.error("Erro ao consultar o CEP:", error);
      });
  }

