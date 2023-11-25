import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyAB7ckwEQUhS1Xezm5PrPqpximHnvdnIVc",
	authDomain: "juice-2854d.firebaseapp.com",
	projectId: "juice-2854d",
	storageBucket: "juice-2854d.appspot.com",
	messagingSenderId: "274236396388",
	appId: "1:274236396388:web:593de08cacb47af7136071",
	databaseURL: "https://juice-2854d-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig, "juice");
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
