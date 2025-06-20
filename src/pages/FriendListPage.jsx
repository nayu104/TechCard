import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const FriendListPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      setError("");
      if (!user) {
        setError("ログインしてください");
        setLoading(false);
        return;
      }
      try {
        const myRef = doc(db, "users", user.uid);
        const mySnap = await getDoc(myRef);
        const myData = mySnap.data();
        const friendIds = myData.friend_ids || [];
        const friendDocs = await Promise.all(
          friendIds.map(fid => getDoc(doc(db, "users", fid)))
        );
        setFriends(friendDocs.filter(snap => snap.exists()).map(snap => snap.data()));
      } catch (err) {
        setError("エラー: " + err.message);
      }
      setLoading(false);
    };
    fetchFriends();
  }, [user]);

  return (
    <div style={{maxWidth: 600, margin: "2rem auto"}}>
      <h2>友達一覧</h2>
      {loading && <p>読み込み中...</p>}
      {error && <p style={{color: "red"}}>{error}</p>}
      <ul>
        {friends.map(friend => (
          <li key={friend.uid} style={{marginBottom: "1rem", border: "1px solid #ccc", borderRadius: 8, padding: 12}}>
            <div><b>{friend.name}</b>（{friend.email}）</div>
            <div>UID: {friend.uid}</div>
            <div>自己紹介: {friend.message}</div>
            <div>スキル: {friend.skills && friend.skills.join(", ")}</div>
            {friend.avatar && <img src={friend.avatar} alt="avatar" style={{width: 48, height: 48, borderRadius: "50%"}} />}
          </li>
        ))}
      </ul>
      {(!loading && friends.length === 0) && <p>友達がいません。</p>}
    </div>
  );
};

export default FriendListPage; 