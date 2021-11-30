import { insert, deleteEntry, getOne, update } from "./dbFunctions.js";

document
	.getElementById("btn-insert")
	.addEventListener("click", onBtnInsertClick);

document
	.getElementById("btn-cadastro")
	.addEventListener("click", onBtnCadastroClick);

document
	.getElementById("btn-listar")
	.addEventListener("click", onBtnListarClick);

document
	.getElementById("btn-excluir")
	.addEventListener("click", onBtnExcluirClick);

document
	.getElementById("btn-update")
	.addEventListener("click", onBtnUpdateClick);

let editingId = null;

const btns = document.getElementsByClassName("nav-link");
const table = document.getElementById("tabela-pessoas");

function getFields() {
	const fields = {
		nome: document.getElementById("nome").value,
		cpf: document.getElementById("cpf").value,
		data_nascimento: document.getElementById("data_nascimento").value,
		sexo: document.querySelector('input[name="sexo"]:checked').value,
		estado_civil: document.getElementById("estado_civil").value,
		renda_mensal: document.getElementById("renda_mensal").value,
		logradouro: document.getElementById("logradouro").value,
		numero_endereco: document.getElementById("numero_endereco").value,
		complemento: document.getElementById("complemento").value,
		estado: document.getElementById("estado").value,
		cidade: document.getElementById("cidade").value,
	};

	return fields;
}

function onBtnInsertClick(event) {
	event.preventDefault();

	insert(getFields());

	document.getElementById("menu-cadastrar").reset();
}

async function onBtnExcluirClick(event) {
	event.preventDefault();

	const entries = document.getElementsByClassName("excluir-checkbox");
	console.log(entries);
	if (entries.length > 0)
		if (confirm("Deseja excluir o(s) registro(s) selecionado(s)?")) {
			for (const entry of entries) {
				if (entry.checked)
					await deleteEntry(entry.parentNode.parentNode.id);
			}

			alert("Registro(s) excluído(s) com sucesso!");
		}
}

function onBtnListarClick(event) {

	event.preventDefault();

	changeSelectedLink(event.target);

	showMenu("menu-listar");
	hideMenu("menu-cadastrar");
}

function onBtnCadastroClick(event) {
	event.preventDefault();

	changeSelectedLink(event.target);

	showMenu("menu-cadastrar");
	hideMenu("menu-listar");
	showMenu("btn-insert");
	hideMenu("btn-update");
}

async function onBtnEditarClick(event) {
	event.preventDefault();

	changeSelectedLink(event.target);

	showMenu("menu-cadastrar");
	hideMenu("menu-listar");
	hideMenu("btn-insert");
	showMenu("btn-update");
	editingId = event.target.parentNode.parentNode.id
	await fillFields(editingId);
}

async function fillFields(docId) {
	const data = await getOne(docId);

	document.getElementById("nome").value = data.nome;
	document.getElementById("cpf").value = data.cpf;
	document.getElementById("data_nascimento").value = data.data_nascimento;
	document.getElementById("estado_civil").value = data.estado_civil;
	document.getElementById("renda_mensal").value = data.renda_mensal;
	document.getElementById("logradouro").value = data.logradouro;
	document.getElementById("numero_endereco").value = data.numero_endereco;
	document.getElementById("complemento").value = data.complemento;
	document.getElementById("estado").value = data.estado;
	document.getElementById("cidade").value = data.cidade;

	const checkMasc = document.getElementById("sexoMasculino");
	const checkFem = document.getElementById("sexoFeminino");
	const isMasc = data.sexo == "masculino";
	checkMasc.checked = isMasc;
	checkFem.checked = !isMasc;
}

async function onBtnUpdateClick(event) {
	event.preventDefault();
	await update(editingId, getFields());
	alert("Registro atualizado com sucesso!");

	document.location.reload();
}

function changeSelectedLink(target) {
	target.classList.add("selected");

	for (const btn of btns) {
		if (btn != target) btn.classList.remove("selected");
	}
}

const isHidden = (menuId) =>
	document.getElementById(menuId).classList.contains("d-none");

function hideMenu(menuId) {
	if (isHidden(menuId)) return;
	const menu = document.getElementById(menuId);
	menu.classList.add("d-none");
}

function showMenu(menuId) {
	if (!isHidden(menuId)) return;
	const menu = document.getElementById(menuId);
	menu.classList.remove("d-none");
}

function updateTable(entry, entryId) {
	table.innerHTML +=
		`<tr id="${entryId}">` +
		`<td>${entry.nome}</td>` +
		`<td>${entry.cpf}</td>` +
		`<td>${entry.sexo}</td>` +
		`<td>${entry.data_nascimento}</td>` +
		`<td>${entry.estado_civil}</td>` +
		`<td>${entry.renda_mensal}</td>` +
		`<td>${entry.estado}</td>` +
		`<td>${entry.cidade}</td>` +
		`<td>${entry.logradouro}</td>` +
		`<td>${entry.numero_endereco}</td>` +
		`<td>${entry.complemento}</td>` +
		'<td><button class="btn btn-secondary btn-editar">Editar</button>' +
		`<td><input class="form-check-input excluir-checkbox" type="checkbox"/></td>` +
		"</tr>";

	for (const btn of document.getElementsByClassName("btn-editar")) {
		console.log(btn);
		btn.addEventListener("click", onBtnEditarClick);
	}
}

function removeEntry(docId) {
	table.removeChild(document.getElementById(docId));
}

export { updateTable, removeEntry };
