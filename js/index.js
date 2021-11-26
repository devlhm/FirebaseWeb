import { getAll, insert } from "./dbFunctions.js";

document
	.getElementById("btn-insert")
	.addEventListener("click", onBtnInsertClick);

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
	console.log("clicked");

	insert(getFields());
}
