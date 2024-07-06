function abrirmodal() {
    overlay.classList.add("active");
    criartarefa.classList.add("active");
}
function fecharmodal() {
    overlay.classList.remove("active");
    criartarefa.classList.remove("active");
}

function buscartarefas() {
    fetch("http://localhost:3000/tarefas")
        .then(res => res.json())
        .then(res => {
            inserirtarefas(res);
        })
} buscartarefas();

function inserirtarefas(listadetarefas) {
    if (listadetarefas.length > 0) {
        lista.innerHTML = ""
        listadetarefas.map(tarefa => {
            lista.innerHTML += ` 
            <li>
                <h5>${tarefa.titulo}</h5>
                <p>${tarefa.descricao}</p>
                <div class="actions">
                    <box-icon name='trash' size="sm" onclick="deletartarefa(${tarefa.id})"></box-icon>
                </div>
            </li>
            `;

        })
    }
}
function novatarefa() {
    event.preventDefault();
    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value
    }
    fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        },
        body: JSON.stringify(tarefa)
    })
        .then(() => {
            fecharmodal();
            buscartarefas()
        })
}
function deletartarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE",
    })
        .then(res => res.json())
        .then(res => {

        })
    buscartarefas()
}
function PesquisarTarefa() {
    let lis = document.querySelectorAll("ul li");
    if(busca.value.length > 0) {
        lis.forEach(li => {
            if(!li.children[0].innerText.includes(busca.value)) {
                li.classList.add('oculto');
            } else {
                li.classList.remove('oculto');
            }
        })
    }else{
        lis.forEach(li =>{
            li.classList.remove('oculto');
        })
    }
}



