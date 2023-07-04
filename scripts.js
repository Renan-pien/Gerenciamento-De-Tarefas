// Mapeando Elementos HTML
const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  });

  input.value = '';

  mostrarTarefas();
}

function mostrarTarefas() {
  let novaLi = '';

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi +=
      `
        <li class="task ${item.concluida && 'done'}">
            <img src="imagens/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="imagens/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
            <img src="imagens/update.png" alt="atualizar-tarefa" onclick="editarTarefa(${posicao}, this)">
        </li>
      `;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

  mostrarTarefas();
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);

  mostrarTarefas();
}

function editarTarefa(posicao, elemento) {
  const item = minhaListaDeItens[posicao];
  const p = listaCompleta.querySelector(`li:nth-child(${posicao + 1}) p`);
  p.contentEditable = true;
  p.focus();

  p.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      p.blur();
    }
  });

  p.addEventListener('blur', () => {
    p.contentEditable = false;
    item.tarefa = p.textContent;
    mostrarTarefas();
  });

  elemento.classList.add('rotate-animation');
  setTimeout(() => {
    elemento.classList.remove('rotate-animation');
  }, 1000);
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

recarregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);
