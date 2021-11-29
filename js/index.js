import { getAll, insert } from "./dbFunctions.js";

document
	.getElementById("btn-insert")
	.addEventListener("click", onBtnInsertClick);

document
	.getElementById("btn-listar")
	.addEventListener("click", onBtnListarClick);

function getFields() {
	const fields = {
		nome: document.getElementById("nome").value,
		cpf: document.getElementById("cpf").value,
		data_nascimento: document.getElementById("data_nascimento").value,
		sexo: document.querySelector("input[name=\"sexo\"]:checked").value,
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
	if(isHidden("menu-cadastrar")) {
		showMenu("menu-cadastrar");
		hideMenu("menu-listar");
		return;
	}

	insert(getFields());
}

function onBtnListarClick(event) {
	event.preventDefault();

	showMenu("menu-listar");
	hideMenu("menu-cadastrar");
	getAll();

}

const isHidden = menuId =>
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
