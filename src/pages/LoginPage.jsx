//src/pages/Loginpage.jsx

import SidebarList from "../components/SideBarList";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";


import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ログイン処理
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userRef = doc(db, "users", user.uid); // どのドキュメントを見に行くか
        const userSnap = await getDoc(userRef); // そのドキュメントを取得（中身含む）

      // ドキュメントがまだ存在しない（つまり初ログイン） 
      if(!userSnap.exists()) {
      await setDoc(userRef,{
        email: user.email,
        name: "未設定",
        skills:[],
        message: "",
        github:"",
        avatar:"",
        createdAt: new Date(),
        friend_ids: []
      });
    }

      alert("ログイン成功！");
      navigate("/mycardbox") //ここで遷移
    } catch (err) {
      setError("ログインに失敗しました: " + err.message);
    }
  };

  return (
    <div className="login-appname-container">
      <div className="app-name-tag">
        <h1>ElectronicBisinessCard</h1>
      </div>
      <div className="login-container">
        {/* <h2>
          login-form
        </h2> */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br/>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <div className="button-container">
            <button type="submit">Login</button>
          </div>
        </form>

        
        {error && <p>{error}</p>}
      </div>
    </div>

  );
};

export default LoginPage;
