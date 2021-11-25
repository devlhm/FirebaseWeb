import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC7E7L0z3N7KpSSVvayh5JR_ZBpIzxC9C8",
    authDomain: "cadastro-consulta.firebaseapp.com",
    projectId: "cadastro-consulta",
    storageBucket: "cadastro-consulta.appspot.com",
    messagingSenderId: "898683450058",
    appId: "1:898683450058:web:a2a89f96a208b5aff97a33",
    measurementId: "G-35RB581Q66"
};

const app = initializeApp(firebaseConfig);

export { app };