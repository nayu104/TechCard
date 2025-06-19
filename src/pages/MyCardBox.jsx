import React, { useState } from 'react';
import BusinessCardList from '../components/BusinessCardList';
import SidebarList from '../components/SideBarList';
import { cards } from '../data/cards'; 
import './MyCardBox.css';

function MyCardBox() {
  const [searchTerm, setSearchTerm] = useState('');

  // スキルや名前で検索して該当する名刺をフィルタリング
  const filteredCards = cards.filter(card => {
    const lowerSearch = searchTerm.toLowerCase().trim();
    const nameMatch = card.name.toLowerCase().includes(lowerSearch);
    const skillMatch = card.skills.some(skill =>
      skill.toLowerCase().includes(lowerSearch)
    );
    const companyMatch = card.company ? 
      card.company.toLowerCase().includes(lowerSearch) : false;
    const positionMatch = card.position ? 
      card.position.toLowerCase().includes(lowerSearch) : false;
    return nameMatch || skillMatch || companyMatch || positionMatch;
  });

  return (
    <div className="my-card-box-container">
      {/* 左サイドバー */}
      <div className="sidebar">
        <SidebarList />
      </div>
      {/* メインエリア */}
      <div className="main-area">
        <h1 className="page-title">
          名刺入れ
        </h1>
        {/* 検索欄 */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="名前、スキル、会社名、役職で検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px 15px',
              fontSize: '1rem',
              width: '60%',
              maxWidth: '500px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        {/* 検索結果の表示 */}
        {searchTerm && (
          <div style={{ marginBottom: '1rem', textAlign: 'center', color: '#666' }}>
            「{searchTerm}」の検索結果: {filteredCards.length}件
          </div>
        )}
        {/* 名刺リスト or メッセージ */}
        {filteredCards.length > 0 ? (
          <BusinessCardList cards={filteredCards} />
        ) : (
          <div style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>
            {searchTerm ? (
              <p>「{searchTerm}」に該当する名刺が見つかりませんでした。</p>
            ) : (
              <p>名刺が登録されていません。</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCardBox;

