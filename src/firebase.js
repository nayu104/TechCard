import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; /*firebaseのデータベース機能を使用するためのgetDatabase関数をインポート */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig); /*ここでFirebaseアプリのインスタンスであるappを作る */
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app); 
/* インスタンス生成したappを渡す これを使ってこのアプリに紐づいたデータベースを取得 
export(輸出) 他のファイルでもconst databaseを使えるようになる*/