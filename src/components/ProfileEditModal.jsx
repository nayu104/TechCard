import React, { useState } from 'react';
import './ProfileEditModal.css';

const SKILL_OPTIONS = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js',
  'Node.js', 'Express', 'NestJS', 'Python', 'Django', 'Flask', 'FastAPI',
  'Java', 'Spring', 'Kotlin', 'Scala', 'Go', 'Rust', 'PHP', 'Laravel', 'Ruby', 'Rails',
  'C', 'C++', 'C#', 'Swift', 'Objective-C', 'Dart', 'Flutter',
  'HTML', 'CSS', 'Sass', 'Less', 'Tailwind CSS', 'Bootstrap',
  'MySQL', 'PostgreSQL', 'SQLite', 'MongoDB', 'Firebase', 'Redis',
  'GraphQL', 'REST API', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure',
  'Linux', 'Git', 'Figma', 'Photoshop', 'Illustrator', 'Unity', 'Unreal Engine'
];

const ProfileEditModal = ({ isOpen, onClose, onSave, form, setForm }) => {
  const [skillSearch, setSkillSearch] = useState('');
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (skill) => {
    setForm((prev) => {
      const skills = prev.skills || [];
      if (skills.includes(skill)) {
        return { ...prev, skills: skills.filter(s => s !== skill) };
      } else if (skills.length < 5) {
        return { ...prev, skills: [...skills, skill] };
      } else {
        return prev; // 最大6つ
      }
    });
  };

  const filteredSkills = SKILL_OPTIONS.filter(skill =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  return (
    <div className="profile-edit-overlay">
      <div className="profile-edit-modal">
        <div className="profile-edit-header">
          <button className="close-btn" onClick={onClose}>&times;</button>
          <span className="profile-edit-title">名刺を編集</span>
          <button className="save-btn" onClick={onSave}>保存</button>
        </div>
        <div className="profile-edit-body">
          <div className="profile-edit-avatar">
            <label htmlFor="avatar-upload" className="avatar-label">
              <img
                src={form.avatar || 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'}
                alt="avatar"
                className="avatar-img"
              />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setForm(f => ({ ...f, avatar: ev.target.result }));
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
          <div className="profile-edit-fields">
            <label>名前
              <input name="name" value={form.name} onChange={handleChange} maxLength={50} />
            </label>
            <label>GitHubアカウント
              <input name="github" value={form.github} onChange={handleChange} maxLength={100} placeholder="https://github.com/yourname" />
            </label>
            <label>ひとことメッセージ (50文字以内)
              <textarea name="message" value={form.message} onChange={handleChange} maxLength={50} />
            </label>
            <label>技術スタック（最大5つ）
              <input
                type="text"
                className="skill-search-box"
                placeholder="スキル検索..."
                value={skillSearch}
                onChange={e => setSkillSearch(e.target.value)}
                style={{marginBottom: '0.5rem', width: '100%'}}
              />
              <div className="skills-checkbox-group">
                {filteredSkills.map(skill => (
                  <label key={skill} className="skill-checkbox">
                    <input
                      type="checkbox"
                      checked={form.skills && form.skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      disabled={form.skills && form.skills.length >= 5 && !(form.skills.includes(skill))}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal; 