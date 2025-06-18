import React, { useState } from 'react';
import BusinessCard from '../components/BusinessCard';
import SidebarList from '../components/SideBarList';
import { cards } from '../data/mycard';
import './MyBusinessCard.css';
import { useNavigate } from 'react-router-dom';
import ProfileEditModal from '../components/ProfileEditModal';

function MyBusinessCard() {
  const navigate = useNavigate(); 
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: cards[0].name || '',
    github: cards[0].github || '',
    message: cards[0].message || '',
    skills: cards[0].skills || [],
    avatar: cards[0].avatar || '',
  });

  const handleSave = () => {
    // 技術スタックは最大4つまで
    if (form.skills.length > 4) {
      setForm(f => ({ ...f, skills: f.skills.slice(0, 4) }));
    }
    setModalOpen(false);
  };

  return (
    <div className="my-business-card-container">
      {/* サイドバー */}
      <aside className="sidebar">
        <SidebarList />
      </aside>

      {/* 右側コンテンツ（ヘッダー＋メイン） */}
      <div className="content-wrapper">
        {/* ヘッダー */}
        <header className="header">
          <h1 className="header-title">
            自分の名刺(プロフィール)
          </h1>
          <button onClick={() => setModalOpen(true)} className="edit-button">
            プロフィール編集
          </button>
        </header>

        {/* メインエリア */}
        <main className="main-content">
          <section className="card-section">
            <BusinessCard
              name={form.name}
              github={form.github}
              skills={form.skills}
              avatar={form.avatar}
              message={form.message}
            />
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
    </div>
  );
}

export default MyBusinessCard;
