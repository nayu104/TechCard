import React, { useState } from 'react';
import './IconTextButton.css';

const IconTextButton = ({ icon: Icon, label, onClick }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = (e) => {
    setIsRotating(false); // いったんリセット
    setTimeout(() => {
      setIsRotating(true); // 必ず毎回発動
    }, 0);
    if (onClick) onClick(e);
  };

  const handleAnimationEnd = () => {
    setIsRotating(false);
  };

  return (
    <button
      onClick={handleClick}
      className="icon-text-button"
    >
      <span
        className={`icon-rotate${isRotating ? ' rotating' : ''}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <Icon size={20} />
      </span>
      {label}
    </button>
  );
};

export default IconTextButton;