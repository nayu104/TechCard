import React from 'react';
import BusinessCard from '../components/BusinessCard';
import SidebarList from '../components/SideBarList';
import { cards } from '../data/mycard';
import './MyBusinessCard.css';

function MyBusinessCard() {
  const handleEditClick = () => {
    alert("プロフィール編集画面へ（ここをあとで編集）");
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
          <button
            onClick={handleEditClick}
            className="edit-button"
          >
            プロフィール編集
          </button>
        </header>

        {/* メインエリア */}
        <main className="main-content">
          <section className="card-section">
            <BusinessCard
              name={cards[0].name}
              github={cards[0].github}
              skills={cards[0].skills}
              avatar={cards[0].avatar}
              message={cards[0].message}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default MyBusinessCard;
