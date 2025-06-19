import IconTextButton from './IconTextButton'

import { FaUserCircle } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import { FaFolderOpen } from 'react-icons/fa'

	import { MdContactPage } from 'react-icons/md'
	import { FaCheckCircle } from 'react-icons/fa'

  import { useNavigate } from 'react-router-dom';
import './SideBarList.css';


function SidebarList() {
  
  const navigate = useNavigate(); 
  return (
    <div className="sidebar-list">
      <h2 className="sidebar-title">電子名刺メニュー</h2>

      <IconTextButton
      icon={FaUserCircle}
      label="プロフィール"
      onClick={() => navigate('/mybusinesscard')}
    />

    <IconTextButton
      icon={MdContactPage}
      label="名刺リスト"
       onClick={() => navigate('/mycardbox')}//画面遷移のパスを書いてください
    />

    <IconTextButton
      icon={FaSearch}
      label="友達検索"
      onClick={() => console.log('Home clicked')}//画面遷移のパスを書いてください
    />

    <IconTextButton
      icon={FaCheckCircle}
      label="ログイン画面テスト"
      onClick={() => navigate('/')}//画面遷移のパスを書いてください
    />

    </div>
  );
}

export default SidebarList;
