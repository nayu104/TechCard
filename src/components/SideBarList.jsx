import IconTextButton from './IconTextButton'

import { FaUserCircle } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import { FaFolderOpen } from 'react-icons/fa'

	import { MdContactPage } from 'react-icons/md'
	import { FaCheckCircle } from 'react-icons/fa'

  import { useNavigate } from 'react-router-dom';


function SidebarList() {
  
  const navigate = useNavigate(); 
  return (
   <div style={{
  display: 'grid',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}}>

  <h2>電子名刺メニュー</h2>

  <IconTextButton
  icon={FaUserCircle}
  label="プロフィール"
  onClick={() => console.log('Home clicked')}//画面遷移のパスを書いてください
/>

<IconTextButton
  icon={MdContactPage}
  label="名刺リスト"
   onClick={() => navigate('/mycardbox')}//画面遷移のパスを書いてください
/>

<IconTextButton
  icon={FaSearch}
  label="友達検索"
   onClick={() => navigate('/friendsearch')}//画面遷移のパスを書いてください
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
