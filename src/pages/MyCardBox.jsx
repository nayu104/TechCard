import React, { useState, useEffect } from 'react';
import BusinessCardList from '../components/BusinessCardList';
import SidebarList from '../components/SideBarList';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './MyCardBox.css';

function MyCardBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [friendCards, setFriendCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // 認証状態を監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // フレンドの名刺情報を取得
  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      if (!user) {
        setFriendCards([]);
        setLoading(false);
        return;
      }
      try {
        const myRef = doc(db, 'users', user.uid);
        const mySnap = await getDoc(myRef);
        const myData = mySnap.data();
        const friendIds = myData.friend_ids || [];
        const friendDocs = await Promise.all(
          friendIds.map(fid => getDoc(doc(db, 'users', fid)))
        );
        const cards = friendDocs.filter(snap => snap.exists()).map(snap => ({
          ...snap.data(),
          uid: snap.id
        }));
        setFriendCards(cards);
      } catch (err) {
        setFriendCards([]);
      }
      setLoading(false);
    };
    if (user) fetchFriends();
  }, [user]);

  // フレンド削除
  const deleteFriend = async (uidToDelete) => {
    if (!user) return;
    try {
      const myRef = doc(db, 'users', user.uid);
      await updateDoc(myRef, {
        friend_ids: arrayRemove(uidToDelete)
      });
      // 即時反映のため再取得
      setFriendCards(prev => prev.filter(card => card.uid !== uidToDelete));
    } catch (err) {
      alert('削除に失敗しました: ' + err.message);
    }
  };

  // 検索フィルタ
  const filteredCards = friendCards.filter(card => {
    const lowerSearch = searchTerm.toLowerCase().trim();
    const nameMatch = card.name.toLowerCase().includes(lowerSearch);
    const skillMatch = card.skills.some(skill =>
      skill.toLowerCase().includes(lowerSearch)
    );
    return nameMatch || skillMatch;
  });

  return (
    <div className="my-card-box-container">
      {/* 左サイドバー */}
      <div className="sidebar">
        <SidebarList />
      </div>
      {/* メインエリア */}
      <div className="main-area">
        <h1 className="page-title">名刺入れ</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="名前、スキルで検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* 検索結果の表示 */}
        {searchTerm && (
          <div style={{ marginBottom: '1rem', textAlign: 'center', color: '#666' }}>
            「{searchTerm}」の検索結果: {filteredCards.length}件
          </div>
        )}
        {/* 名刺リスト or メッセージ */}
        <div style={{flex: 1, overflowY: 'auto', minHeight: 0}}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>読み込み中...</div>
          ) : filteredCards.length > 0 ? (
            <BusinessCardList cards={filteredCards} deleteFriend={deleteFriend} />
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
    </div>
  );
}

export default MyCardBox;

