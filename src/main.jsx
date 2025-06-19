// import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// import { createRoot } from './App.jsx'
// import './index.css'
// import MyCardBox from './MyCardBox.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <MyCardBox />
//   </StrictMode>,
// )

// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
