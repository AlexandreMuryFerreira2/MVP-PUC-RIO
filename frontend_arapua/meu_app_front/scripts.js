/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/produtos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.produtos.forEach(item => insertList(item.nome, item.quantidade, item.valor, item.filial))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputProduct, inputQuantity, inputPrice) => {
  const formData = new FormData();
  formData.append('nome', inputProduct);
  formData.append('quantidade', inputQuantity);
  formData.append('valor', inputPrice);
  formData.append('filial', inputFilial);
  

  let url = 'http://127.0.0.1:5000/produto';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/produto?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputProduct = document.getElementById("newInput").value;
  let inputQuantity = document.getElementById("newQuantity").value;
  let inputPrice = document.getElementById("newPrice").value;
  let inputFilial = document.getElementById("newFilial").value;

  if (inputProduct === '') {
    alert("Escreva o nome de um item!");
  } else if (isNaN(inputQuantity) || isNaN(inputPrice)) {
    alert("Quantidade e valor precisam ser números!");
  } else {
    insertList(inputProduct, inputQuantity, inputPrice, inputFilial)
    postItem(inputProduct, inputQuantity, inputPrice, inputFilial)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameProduct, quantity, price, filial) => {
  var item = [nameProduct, quantity, price, filial]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newQuantity").value = "";
  document.getElementById("newPrice").value = "";
  document.getElementById("newFilial").value = "";

  removeElement()
}


// Função para adicionar um novo cliente
function newItemCliente() {
  const nome = document.getElementById('newNomeCliente').value;
  const telefone = document.getElementById('newTelefoneCliente').value;
  const endereco = document.getElementById('newEnderecoCliente').value;
  const cidade = document.getElementById('newCidadeCliente').value;
  const estado = document.getElementById('newEstadoCliente').value;

  if (nome && telefone && endereco && cidade && estado) {
      // Adiciona cliente à lista
      insertCliente(nome, telefone, endereco, cidade, estado);
      clearClienteInputs();
  } else {
      alert('Por favor, preencha todos os campos.');
  }
}

// Função para inserir um cliente na tabela
function insertCliente(nome, telefone, endereco, cidade, estado) {
  const table = document.getElementById('myTableCliente');
  const row = table.insertRow();

  row.insertCell(0).innerText = nome;
  row.insertCell(1).innerText = telefone;
  row.insertCell(2).innerText = endereco;
  row.insertCell(3).innerText = cidade;
  row.insertCell(4).innerText = estado;

  const deleteCell = row.insertCell(5);
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Excluir';
  deleteBtn.classList.add('deleteBtn');
  deleteBtn.onclick = () => deleteCliente(row);
  deleteCell.appendChild(deleteBtn);
}

// Função para excluir um cliente
function deleteCliente(row) {
  const table = document.getElementById('myTableCliente');
  table.deleteRow(row.rowIndex);
}

// Função para limpar os campos de entrada
function clearClienteInputs() {
  document.getElementById('newNomeCliente').value = '';
  document.getElementById('newTelefoneCliente').value = '';
  document.getElementById('newEnderecoCliente').value = '';
  document.getElementById('newCidadeCliente').value = '';
  document.getElementById('newEstadoCliente').value = '';
}
