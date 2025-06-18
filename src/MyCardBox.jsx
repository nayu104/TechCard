import React, { useState } from 'react'; // useState をインポート
import BusinessCardList from './components/BusinessCardList';
import SidebarList from './components/SidebarList';
import { cards } from './data/cards'; // cardsの情報が保存されているパス (パスは画像に基づいて正しいです)

function MyCardBox() {
  // ★ 修正点1: 検索キーワードを管理するstateをここに定義します
  const [searchTerm, setSearchTerm] = useState('');

  // 検索キーワードに基づいてカードをフィルタリングするロジック
  // ここではnameとskillsの両方で検索できるようにしています
  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{
      display: 'flex', // ← 横並びにする
      minHeight: '100vh', // 画面の高さ全体
      backgroundColor: '#f0f0f0',
      boxSizing: 'border-box',
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

      {/* メインエリア */}
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

        {/*検索入力フィールド*/ }
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}> {/* ★ 修正点3: '2ren' を '2rem' に修正 */}
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


        <BusinessCardList cards={filteredCards}/>
      </div>
    </div>
  );
}

export default MyCardBox;