import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import reportWebVitals from './reportWebVitals';

import { RecoilRoot } from 'recoil';
import { ConfigProvider, notification } from 'antd';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider notify={notification}
      theme={{
        token: {
          /* here is your global tokens */
          colorPrimary: "#36b446"
        },
      }}
    >
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </ConfigProvider>
  </React.StrictMode>,
)
