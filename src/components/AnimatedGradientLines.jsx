import React from 'react';

const AnimatedGradientLines = () => (
  <svg className="bg-animated-lines" width="100vw" height="100vh" viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none'}}>
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff9900" />
        <stop offset="100%" stopColor="#ff6600" />
        <animateTransform attributeName="gradientTransform" type="translate" from="0,0" to="1,0" dur="2s" repeatCount="indefinite" />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff9900" />
        <stop offset="100%" stopColor="#ff6600" />
        <animateTransform attributeName="gradientTransform" type="translate" from="1,0" to="0,0" dur="2s" repeatCount="indefinite" />
      </linearGradient>
    </defs>
    <line x1="960" y1="0" x2="0" y2="432" stroke="url(#grad1)" strokeWidth="8" />
    <line x1="1920" y1="324" x2="576" y2="1080" stroke="url(#grad2)" strokeWidth="8" />
  </svg>
);

export default AnimatedGradientLines; 