import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // 同じCSSを使用
import icon from '../assets/Icon.png';

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // パスワード確認
    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    // パスワードの長さチェック
    if (password.length < 6) {
      setError("パスワードは6文字以上で入力してください");
      return;
    }

    try {
      // ユーザー登録処理
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ユーザー情報をFirestoreに保存
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        email: user.email,
        name: name,
        skills: [],
        message: "",
        github: "",
        avatar: "",
        createdAt: new Date(),
        friend_ids: []
      });

      setIsAnimating(true);
      setTimeout(() => {
        navigate("/mybusinesscard");
      }, 700);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError("このメールアドレスは既に使用されています");
      } else if (err.code === 'auth/invalid-email') {
        setError("有効なメールアドレスを入力してください");
      } else if (err.code === 'auth/weak-password') {
        setError("パスワードが弱すぎます");
      } else {
        setError("登録に失敗しました: " + err.message);
      }
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
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
        <h2>アカウントを作成</h2>
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="名前" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          /><br/>
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
          <input
            type="password"
            placeholder="password (確認)"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          /><br />
          <div className="button-container">
            <button type="submit">登録</button>
          </div>
        </form>
        
        <div className="button-container" style={{ marginTop: '10px' }}>
          <button type="button" onClick={handleBackToLogin} style={{ backgroundColor: '#666' }}>
            ログイン画面に戻る
          </button>
        </div>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage; 