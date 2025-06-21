import React, { useState, useEffect } from 'react';
import BusinessCard from '../components/BusinessCard';
import SidebarList from '../components/SideBarList';
import './MyBusinessCard.css';
import { useNavigate } from 'react-router-dom';
import ProfileEditModal from '../components/ProfileEditModal';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function MyBusinessCard() {
  const navigate = useNavigate(); 
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    github: '',
    message: '',
    skills: [],
    avatar: '',
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copyToast, setCopyToast] = useState(false);

  // 認証状態を監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Firestoreからプロフィール取得
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      if (!user) {
        setForm({ name: '', github: '', message: '', skills: [], avatar: '' });
        setLoading(false);
        return;
      }
      try {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setForm({
            name: data.name || '',
            github: data.github || '',
            message: data.message || '',
            skills: data.skills || [],
            avatar: data.avatar || '',
          });
        }
      } catch {}
      setLoading(false);
    };
    if (user) fetchProfile();
  }, [user]);

  // プロフィール保存
  const handleSave = async () => {
    if (!user) return;
    try {
      const ref = doc(db, 'users', user.uid);
      await updateDoc(ref, {
        name: form.name,
        github: form.github,
        message: form.message,
        skills: form.skills,
        avatar: form.avatar,
      });
      setModalOpen(false);
    } catch (err) {
      alert('保存に失敗しました: ' + err.message);
    }
  };

  return (
    <div className="my-business-card-container">
      {/* サイドバー */}
      <div className="sidebar">
        <SidebarList />
      </div>
      {/* 右側コンテンツ（ヘッダー＋メイン） */}
      <div className="content-wrapper">
        {/* ヘッダー */}
        <header className="header">
          <h1 className="header-title">
            My名刺
          </h1>
          <button onClick={() => setModalOpen(true)} className="edit-button">
            名刺を編集
          </button>
        </header>
        {/* UID表示＋コピー */}
        {user && (
          <div className="uid-row">
            <span className="uid-label">あなたのID:</span>
            <span className="uid-value">{user.uid}</span>
            <button
              className="uid-copy-btn"
              onClick={async () => {
                await navigator.clipboard.writeText(user.uid);
                setCopyToast(true);
                setTimeout(() => setCopyToast(false), 1800);
              }}
            >コピー</button>
          </div>
        )}
        {/* メインエリア */}
        <main className="main-content">
          <section className="card-section">
            {loading ? (
              <div style={{color:'#fff'}}>読み込み中...</div>
            ) : (
              <BusinessCard
                name={form.name}
                github={form.github}
                skills={form.skills}
                avatar={form.avatar}
                message={form.message}
                uid={user?.uid}
              />
            )}
          </section>
        </main>
      </div>
      <ProfileEditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        form={form}
        setForm={setForm}
      />
      {copyToast && (
        <div className="uid-toast">IDをコピーしました</div>
      )}
    </div>
  );
}

export default MyBusinessCard;
