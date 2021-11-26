import { initializeApp } from "firebase/app";
import { config } from "../firebaseAuth"
const app = initializeApp(config);

export { app }