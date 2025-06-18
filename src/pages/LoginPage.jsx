// src/pages/LoginPage.jsx

import SidebarList from "../components/SidebarList"; // スペルを修正: SideBarList -> SidebarList
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // src/firebase.js から auth がエクスポートされていることを前提
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // フォームのデフォルト送信を防ぐ (ページリロードを防ぐ)
    try {
      // Firebaseでログインを試行
      await signInWithEmailAndPassword(auth, email, password);
      alert("ログイン成功！");
      navigate("/mycardbox"); // ログイン成功後に名刺リストページへ遷移
    } catch (err) {
      // ログイン失敗時のエラーハンドリング
      console.error("ログインに失敗しました:", err.message); // デバッグ用にコンソールにも出力
      setError("ログインに失敗しました: " + err.message); // ユーザーに表示するエラーメッセージ
    }
  };

  return (
    <div style={{
      display: 'flex', // ← 横並びにする
      minHeight: '100vh', // 画面の高さ全体
      backgroundColor: '#f0f0f0', // 背景色をMyCardBoxと合わせる (画像では白でしたが、共通化のため)
      boxSizing: 'border-box', // パディングなどが幅に含まれるように
    }}>

      {/* 左サイドバー */}
      <div style={{
        width: '220px',
        backgroundColor: '#1e1e1e',
        padding: '1rem',
        color: 'white'
      }}>
        <SidebarList />
      </div>

      {/* メインエリア - ログインフォームを中央に配置 */}
      <div style={{
        flex: 1, // 残りの幅をすべて取る
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column', // 要素を縦に並べる
        alignItems: 'center', // 水平方向中央揃え
        justifyContent: 'center', // 垂直方向中央揃え
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '20px', // h2の下に少し余白
          color: '#333' // 文字色を濃く
        }}>ログイン</h2>

        <form onSubmit={handleLogin} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px', // 要素間の隙間をCSSで設定
          width: '100%', // 親の幅いっぱいに
          maxWidth: '400px', // フォームの最大幅を設定
          padding: '25px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // 軽い影
        }}>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
          <button
            type="submit"
            style={{
              padding: '12px 20px',
              fontSize: '1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease', // ホバーアニメーション
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'} // ホバー時の色
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'} // ホバー解除時の色
          >
            ログイン
          </button>
          {error && <p style={{ color: "red", textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
