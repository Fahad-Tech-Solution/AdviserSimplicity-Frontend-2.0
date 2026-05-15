import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { ConfigProvider, notification } from "antd";
import { BrowserRouter } from "react-router-dom";
import RecoilNexus from "recoil-nexus";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ConfigProvider
        notify={notification}
        theme={{
          token: {
            /* here is your global tokens */
            colorPrimary: "#36b446",
          },

          // components: {
          //   Layout: {
          //     siderBg: "#36b446",
          //     triggerBg: "#36b446",
          //   },
          // },
        }}
      >
        <RecoilRoot>
          <RecoilNexus />
          <App />
        </RecoilRoot>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
