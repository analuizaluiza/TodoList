const input = document.getElementById('nova-tarefa');
const btnAdicionar = document.getElementById('adicionar');
const lista = document.getElementById('lista-tarefas');
const contador = document.getElementById('contador');

let tarefas = [];

btnAdicionar.addEventListener('click', () => {
  const texto = input.value.trim();
  if (texto !== '') {
    tarefas.push({ texto, concluida: false });
    input.value = '';
    atualizarLista();
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') btnAdicionar.click();
});

function atualizarLista() {
  lista.innerHTML = '';

  const tarefasOrdenadas = [...tarefas].sort((a, b) => a.concluida - b.concluida);

  tarefasOrdenadas.forEach((tarefa) => {
    const indexReal = tarefas.indexOf(tarefa);
    const item = document.createElement('li');
    if (tarefa.concluida) item.classList.add('concluida');

    const span = document.createElement('span');
    span.textContent = tarefa.texto;

    const idUnico = `tarefa-${indexReal}`; 

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = idUnico;
    checkbox.classList.add('custom-checkbox');
    checkbox.checked = tarefa.concluida;
    checkbox.onchange = () => {
      tarefas[indexReal].concluida = checkbox.checked;
      atualizarLista();
    };

    const label = document.createElement('label');
    label.htmlFor = idUnico;
    label.classList.add('checkbox-label');

    const btnRemover = document.createElement('button');
    btnRemover.classList.add('btn-remover');
    btnRemover.innerHTML = '<img src = "images/delete.png">';
    btnRemover.setAttribute('aria-label', 'Remover tarefa');
    btnRemover.onclick = () => {
      tarefas.splice(indexReal, 1);
      atualizarLista();
    };

    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(span);
    item.appendChild(btnRemover);

    lista.appendChild(item);
  });

  const tarefasAtivas = tarefas.filter(t => !t.concluida).length;
  contador.textContent = `Tarefas pendentes: ${tarefasAtivas}`;
}
