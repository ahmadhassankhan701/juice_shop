import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyA67LRgYP6IkZBUf5Fymd5619qPwGjWs9c",
	authDomain: "juiceshop-64800.firebaseapp.com",
	projectId: "juiceshop-64800",
	storageBucket: "juiceshop-64800.appspot.com",
	messagingSenderId: "942710076991",
	appId: "1:942710076991:web:11fbfa4570f3551c722a8a",
};

export const app = initializeApp(firebaseConfig, "JuiceShop");
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
