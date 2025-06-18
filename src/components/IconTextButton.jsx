import React from 'react';
import './IconTextButton.css';

const IconTextButton = ({ icon: Icon, label, onClick}) => {
  return (
    <button
      onClick={onClick}
      className="icon-text-button"
    >
      <Icon size={20} />
      {label}
    </button>
  )
}

export default IconTextButton;