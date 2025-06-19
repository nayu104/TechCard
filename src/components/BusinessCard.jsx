import { skillIcons } from '../data/skillIcons';
import './BusinessCard.css';

function BusinessCard({name, github, skills, avatar, message}) {
  return (
    <div className="business-card">
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