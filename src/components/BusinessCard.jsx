import { skillIcons } from '../data/skillIcons';
import QRCodeComponent from './QRCode';
import './BusinessCard.css';

function BusinessCard({name, github, skills, avatar, message, uid}) {
  // QRコードに含める名刺情報をJSON形式で作成
  const cardData = {
    name: name,
    github: github,
    skills: skills,
    message: message,
    uid: uid
  };
  
  const qrValue = JSON.stringify(cardData);

  return (
    <div className="business-card">
      {/* QRコードを右上に配置 */}
      <div className="qr-code-top-right">
        <QRCodeComponent value={qrValue} size={80} className="qr-code" />
      </div>
      
      <div className="card-header">
        <img src={avatar} alt={name} className="avatar" />
        <h3 className="user-name">{name}</h3>
      </div>

      {/* GitHubリンクを表示 */}
      <a href={github} target="_blank" className="github-link">
        <img 
          src="src\assets\GitHub_Invertocat_Light.png"
          alt="GitHub Icon"
          className="github-icon"
        />
        GitHub
      </a>

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