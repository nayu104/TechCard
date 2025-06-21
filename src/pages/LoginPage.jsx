//src/pages/Loginpage.jsx

import SidebarList from "../components/SideBarList";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import icon from '../assets/Icon.png';
import { MdEmail } from 'react-icons/md';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAnimating, setIsAnimating] = useState(false); // アニメーション用state
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
      setIsAnimating(true); // アニメーション開始
      setTimeout(() => {
        navigate("/mybusinesscard"); // アニメーション後に遷移
      }, 700); // アニメーション時間と合わせる
    } catch (err) {
      setError("ログインに失敗しました: " + err.message);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className={`login-appname-container${isAnimating ? ' login-animate-out' : ''}`}>
      <div className="logo-split-container">
        <img src={icon} alt="App Icon Left" className={`logo-split left${isAnimating ? ' animate-left' : ''}`} />
        <img src={icon} alt="App Icon Right" className={`logo-split right${isAnimating ? ' animate-right' : ''}`} />
      </div>
      <div className="app-name-tag">
        <h1>TechCard</h1>
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

          {/* まだアカウントがない場合の新規ユーザー登録ボタン */}
        <div className="button-container" style={{ marginTop: '10px' }}>
          <button type="button" onClick={handleRegister} style={{ backgroundColor: '#4CAF50' }}>
            アカウントを作成
          </button>
        </div>

        
        {error && <p>{error}</p>}
      </div>
    </div>

  );
};

export default LoginPage;
