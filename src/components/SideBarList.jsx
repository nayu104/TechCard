import React, { useState } from 'react';
import IconTextButton from './IconTextButton'

import { FaUserCircle } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import { FaFolderOpen } from 'react-icons/fa'

import { MdContactPage } from 'react-icons/md'
import { FaCheckCircle } from 'react-icons/fa'

import { useNavigate } from 'react-router-dom';
import './SideBarList.css';
import icon from '../assets/Icon.png';


function SidebarList() {
  const [isRotating, setIsRotating] = useState(false);
  const navigate = useNavigate(); 

  const handleIconClick = () => {
    setIsRotating(false);
    setTimeout(() => {
      setIsRotating(true);
    }, 0);
  };
  const handleAnimationEnd = () => {
    setIsRotating(false);
  };

  return (
    <div className="sidebar-list">
      <h2 className="sidebar-title">
        <span
          className={`icon-rotate${isRotating ? ' rotating' : ''}`}
          onClick={handleIconClick}
          onAnimationEnd={handleAnimationEnd}
          style={{ display: 'inline-block', cursor: 'pointer' }}
        >
          <img src={icon} alt="App Icon" style={{ width: '2.5em', height: '2.0em', marginLeft: '1.5em', verticalAlign: 'middle', borderRadius: '20%' }} />
        </span>
        TechCard
      </h2>

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
      onClick={() => navigate('/friendadd')}
    />

    <IconTextButton
      icon={FaCheckCircle}
      label="ログアウト"
      onClick={() => navigate('/')}//画面遷移のパスを書いてください.
    />

    </div>
  );
}

export default SidebarList;
