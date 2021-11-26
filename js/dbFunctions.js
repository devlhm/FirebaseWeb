import { collection, query, where, getDocs, addDoc} from "firebase/firestore";
import { app } from "./firebase";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app)

function getAll() {
	const q = query(collection(db, "usuarios"));
	const querySnapshot = getDocs(q).then(
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        })
    );
}

function insert(data) {
    addDoc(collection(db, "usuarios"), data)
    .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        alert("Registro inserido com sucesso!");
    })
    .catch(err => console.error(err));
}

export { getAll, insert };
