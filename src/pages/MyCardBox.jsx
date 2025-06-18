/*
import BusinessCardList from '../components/BusinessCardList';
import SidebarList from '../components/SideBarList';
import './MyCardBox.css';

function MyCardBox() {
  return (
    <div className="my-card-box-container">
      {/* 左サイドバー */ /*}
      <div className="sidebar">
        <SidebarList />
      </div>
      {/* メインエリア *//*}
      <div className="main-area">
        <h1 className="page-title">
          名刺入れ
        </h1>
        <BusinessCardList />
      </div>
    </div>
  );
}

export default MyCardBox;


/*
import React, { useState } from 'react'; // useState をインポート
import BusinessCard from '../components/BusinessCard';
import SidebarList from '../components/SideBarList';
import { cards } from './data/cards'; // cardsの情報が保存されているパス (パスは画像に基づいて正しいです)
*/


/*
import React, { useState } from 'react';
import BusinessCardList from '../components/BusinessCardList';
import SidebarList from '../components/SideBarList';
import { cards } from '../data/mycard';

function MyCardBox() {
  // 検索キーワードの state
  const [searchTerm, setSearchTerm] = useState('');

  // フィルタリング処理（名前・スキルで検索）
  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      boxSizing: 'border-box',
    }}>
      {/* 左サイドバー */ /*}
      <div style={{
        width: '220px',
        backgroundColor: '#1e1e1e',
        padding: '1rem',
        color: 'white',
      }}>
        <SidebarList />
      </div>

      {/* メインエリア */ /*}
      <div style={{
        flex: 1,
        padding: '2rem',
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '2rem',
          color: '#000000',
        }}>
          名刺入れ
        </h1>

        {/* 検索フォーム *//*}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="名前やスキルで検索"
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

        {/* フィルタされたカード一覧 */ /*}
        <BusinessCardList cards={filteredCards} />
      </div>
    </div>
  );
}

export default MyCardBox;*/

import React, { useState } from 'react';
import BusinessCardList from '../components/BusinessCardList';
import SidebarList from '../components/SideBarList';
import { cards } from '../data/cards'; 

function MyCardBox() {
  const [searchTerm, setSearchTerm] = useState('');

  // スキルや名前で検索して該当する名刺をフィルタリング
  const filteredCards = cards.filter(card => {
    const lowerSearch = searchTerm.toLowerCase().trim();
    
    // 名前で検索
    const nameMatch = card.name.toLowerCase().includes(lowerSearch);
    
    // スキルで検索
    const skillMatch = card.skills.some(skill =>
      skill.toLowerCase().includes(lowerSearch)
    );
    
    // 会社名で検索（もし会社名フィールドがある場合）
    const companyMatch = card.company ? 
      card.company.toLowerCase().includes(lowerSearch) : false;
    
    // 役職で検索（もし役職フィールドがある場合）
    const positionMatch = card.position ? 
      card.position.toLowerCase().includes(lowerSearch) : false;
    
    return nameMatch || skillMatch || companyMatch || positionMatch;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      {/* 左サイドバー */}
      <div style={{ width: '220px', backgroundColor: '#1e1e1e', padding: '1rem', color: 'white' }}>
        <SidebarList />
      </div>

      {/* メインエリア */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem' }}>
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

