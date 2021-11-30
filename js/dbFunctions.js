import {
	collection,
	query,
	where,
	doc,
	getDoc,
	addDoc,
	onSnapshot,
	deleteDoc,
	updateDoc
} from "firebase/firestore";
import { app } from "./firebase";
import { getFirestore } from "firebase/firestore";
import { updateTable, removeEntry } from "./index";

let data = null;

const db = getFirestore(app);

const q = query(collection(db, "usuarios"));
onSnapshot(q, (snapshot) => {
	snapshot.docChanges().forEach((change) => {
		if (change.type === "added") {
			console.log("New user: ", change.doc.data());
			updateTable(change.doc.data(), change.doc.id);
		}
		if (change.type === "modified") {
			console.log("Modified user: ", change.doc.data());
		}
		if (change.type === "removed") {
			console.log("Removed user: ", change.doc.id);
			removeEntry(change.doc.id);
		}
	});
});

function insert(data) {
	addDoc(collection(db, "usuarios"), data)
		.then((docRef) => {
			console.log("Document written with ID: ", docRef.id);
			alert("Registro inserido com sucesso!");
		})
		.catch((err) => console.error(err));
}

async function update(docId, data) {
	console.log(docId);
	const docRef = doc(db, "usuarios", docId);
	await updateDoc(docRef, data);
}

async function getOne(docId) {
	const docRef = doc(db, "usuarios", docId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) return docSnap.data();
	else console.error("No such document!");
}

async function deleteEntry(id) {
	await deleteDoc(doc(db, "usuarios", id));
}

export { insert, deleteEntry, getOne, update };
