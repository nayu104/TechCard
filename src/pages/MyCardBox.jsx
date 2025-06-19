import BusinessCardList from '../components/BusinessCardList';
import SidebarList from '../components/SideBarList';
import './MyCardBox.css';

function MyCardBox() {
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
        <BusinessCardList />
      </div>
    </div>
  );
}

export default MyCardBox;
