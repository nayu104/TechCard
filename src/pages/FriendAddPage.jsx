import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import SidebarList from "../components/SideBarList";
import BusinessCard from "../components/BusinessCard";
import "./MyCardBox.css";

const FriendAddPage = () => {
  const [uidInput, setUidInput] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [adding, setAdding] = useState(false);

  // ログインユーザー情報をリアルタイムで保持
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // UIDでユーザー検索
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchResult(null);
    setSearchError("");
    setMessage("");
    if (!user) {
      setSearchError("ログインしてください");
      return;
    }
    if (uidInput === user.uid) {
      setSearchError("自分自身は追加できません");
      return;
    }
    try {
      const friendRef = doc(db, "users", uidInput);
      const friendSnap = await getDoc(friendRef);
      if (!friendSnap.exists()) {
        setSearchError("そのIDのユーザーは存在しません");
        return;
      }
      setSearchResult({ ...friendSnap.data() });
    } catch (err) {
      setSearchError("エラー: " + err.message);
    }
  };

  // 名刺追加
  const handleAddFriend = async () => {
    setAdding(true);
    setMessage("");
    try {
      const myRef = doc(db, "users", user.uid);
      const mySnap = await getDoc(myRef);
      const myData = mySnap.data();
      if (myData.friend_ids && myData.friend_ids.includes(uidInput)) {
        setMessage("すでに追加済みです");
        setAdding(false);
        return;
      }
      await updateDoc(myRef, {
        friend_ids: arrayUnion(uidInput)
      });
      setMessage("名刺を追加しました！"); //友達を追加しましたから名刺を追加しましたに変更
    } catch (err) {
      setMessage("エラー: " + err.message);
    }
    setAdding(false);
  };

  return (
    <div className="my-card-box-container" style={{minHeight:'100vh'}}>
      <div className="sidebar">
        <SidebarList />
      </div>
      <div className="main-area" style={{color:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start'}}>
        <h2 className="page-title">IDで名刺の検索・追加</h2> 
        {/* //6/21 ここを友達から名刺に変更 */}
        <form onSubmit={handleSearch} className="input-group">
          <input
            type="text"
            value={uidInput}
            onChange={e => setUidInput(e.target.value)}
            placeholder="名刺IDを入力"
            required
          />
          <button type="submit" className="button-orange">検索</button>
        </form>
        {searchError && <p style={{color:'#ff6600'}}>{searchError}</p>}
        {searchResult && (
          <div style={{position:'relative', margin:'2rem 0'}}>
            <BusinessCard {...searchResult} uid={uidInput} showQRCode={false} />
            <button
              onClick={handleAddFriend}
              disabled={adding}
              style={{position:'absolute', top:12, right:12, background:'linear-gradient(135deg,#ff9900,#ff6600)', color:'#fff', border:'none', borderRadius:8, padding:'0.3em 0.9em', fontWeight:'bold', fontSize:'0.95rem', cursor:'pointer', zIndex:10, boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}
            >追加</button>
          </div>
        )}
        {message && <p style={{color:'#ff9900', fontWeight:'bold'}}>{message}</p>}
      </div>
    </div>
  );
};

export default FriendAddPage; 