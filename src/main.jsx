import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import reportWebVitals from './reportWebVitals';

import { RecoilRoot } from 'recoil';
import { ConfigProvider, notification } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ConfigProvider notify={notification}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </ConfigProvider>
  </React.StrictMode>,
)
