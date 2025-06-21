import React from 'react';
import { skillIcons } from '../data/skillIcons';
import QRCodeComponent from './QRCode';
import './BusinessCard.css';
import defaultAvatar from '../assets/kkrn_icon_user_11.png';
import githubIcon from '../assets/GitHub_Invertocat_Light.png';

function BusinessCard({name, github, skills, avatar, message, uid, showQRCode}) {
  // QRコードに含める名刺情報をJSON形式で作成
  const cardData = {
    name: name,
    github: github,
    skills: skills,
    message: message,
    uid: uid,
    showQRCode: true
  };
  
  const qrValue = JSON.stringify(cardData);

  return (
    <div className="business-card">
      {/* QRコードを右上に配置 */}
      {showQRCode && (
      <div className="qr-code-top-right">
        <QRCodeComponent value={qrValue} size={80} className="qr-code" />
      </div>
      )}
      
      <div className="card-header">
        {/* <img src={avatar} alt={name} className="avatar" /> */}
        {/* 6/21 アイコンを設定していない場合はデフォルトアイコンを使用 */ }
        <img 
          src={avatar || defaultAvatar} 
          alt={name} 
          className="avatar" 
        />
        <h3 className="user-name">{name}</h3>
      </div>

      {/* GitHubリンクを表示 */}
      {/* 6/21 分岐を用いてgithubリンクが未入力の場合に対応 */}
      {github ? (
        <a href={github} target="_blank" className='github-link'>
          <img
            src={githubIcon}
            alt="GitHub Icon"
            className="github-icon"
          />
          Github
        </a>
      ) : (
        <div className='github-link'>
          <img
            src={githubIcon}
            alt="GitHub Icon"
            className="github-icon"
          />  
          <span style={{color: 'white', textDecoration: 'none'}}>未入力</span>
        </div>
      )}

      {/* <a href={github} target="_blank" className="github-link">
        <img 
          src="src\assets\GitHub_Invertocat_Light.png"
          alt="GitHub Icon"
          className="github-icon"
        />
        GitHub
      </a> */}

      <div className="skills-container">
        {skills.map(skill => (
          <span key={skill} className="skill-tag">
            {skillIcons[skill]}{skill}
          </span>
        ))}
      </div>
      
      <p className="message-container">
        <span className="message-label">
          ひとことメッセージ：</span><br />
        {message}
      </p>
    </div>
  );
}

export default BusinessCard;