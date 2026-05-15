import{h,u as f,r as t,j as e}from"./index-mEkFiz8S.js";import{h as y,A as b}from"./index-BkLhoIx9.js";import{x as w}from"./index-BQbJzo1K.js";import{C as j}from"./index-DO9BpHex.js";import{B as d}from"./button-B5VDBiiw.js";import"./iconBase-B52f9VP-.js";import"./Compact-DYLkEn0E.js";const F=()=>{const s=h(),o=f(),[g,m]=t.useState([]),[p,c]=t.useState(""),[r,l]=t.useState("warning");t.useEffect(()=>{const a=new URLSearchParams(s.search);a.get("message")==="warning alert"?(c("Your access has been restricted by the Super Admin. Reach out to them to restore your account."),l("warning")):a.get("message")==="pricing table"&&(c("Your current subscription has ended. Visit the billing section to renew or upgrade your plan."),l("error"))},[s.search]),t.useEffect(()=>{(()=>{const n=[];for(let i=0;i<50;i++)n.push({id:i,x:Math.random()*100,y:Math.random()*100,size:Math.random()*4+2,duration:Math.random()*20+10,delay:Math.random()*5});m(n)})()},[]);const u=()=>{o(-1)},x=()=>{o("/pricing-table")};return e.jsxs("div",{className:"warning-screen",children:[e.jsxs("div",{className:"animated-background",children:[e.jsx("div",{className:"gradient-overlay"}),g.map(a=>e.jsx("div",{className:"particle",style:{left:`${a.x}%`,top:`${a.y}%`,width:`${a.size}px`,height:`${a.size}px`,animationDuration:`${a.duration}s`,animationDelay:`${a.delay}s`}},a.id))]}),e.jsx("div",{className:"card-container",children:e.jsx(j,{className:"warning-card",bordered:!1,style:{maxWidth:600,width:"90%",background:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(10px)",borderRadius:"16px",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.1)"},children:e.jsxs("div",{className:"warning-content",children:[e.jsx("div",{className:"warning-icon",children:r=="warning"?e.jsx(e.Fragment,{children:e.jsx(y,{className:"text-warning",style:{fontSize:45,marginBottom:16}})}):e.jsx(e.Fragment,{children:e.jsx(w,{className:"text-danger",style:{fontSize:45,marginBottom:16}})})}),e.jsx("h2",{className:"warning-title",children:"System Notice"}),e.jsx(b,{message:p,type:r,showIcon:!0,style:{marginBottom:"24px",borderRadius:"8px",fontSize:"16px"}}),e.jsxs("div",{className:"action-buttons",children:[e.jsx(d,{type:"default",size:"large",onClick:u,style:{marginRight:"12px"},children:"Go Back"}),r=="error"&&e.jsx(d,{type:"primary",size:"large",onClick:x,style:{marginRight:"12px"},children:"Buy Subscription"})]})]})})}),e.jsx("style",{jsx:!0,children:`
        .warning-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        }

        .animated-background {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            #36b446,
            #2da23b,
            #1f742a,
            #36b446
          );
          background-size: 400% 400%;
          animation: gradientShift 8s ease-in-out infinite;
        }

        .gradient-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(
              circle at 30% 70%,
              rgba(54, 180, 70, 0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 70% 30%,
              rgba(45, 162, 59, 0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 50% 50%,
              rgba(31, 116, 42, 0.2) 0%,
              transparent 50%
            );
          animation: overlayPulse 6s ease-in-out infinite alternate;
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: float linear infinite;
          pointer-events: none;
        }

        .card-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 20px;
          z-index: 10;
        }

        .warning-card {
          animation: cardFloat 3s ease-in-out infinite, cardFadeIn 0.8s ease-out;
          transform-origin: center center;
        }

        .warning-content {
          text-align: center;
          padding: 20px;
        }

        .warning-title {
          font-size: 28px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 20px;
          margin-top: 0;
        }

        .action-buttons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes overlayPulse {
          0% {
            opacity: 0.5;
            transform: scale(1);
          }
          100% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes cardFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(0.5deg);
          }
        }

        @keyframes cardFadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }

        @media (max-width: 768px) {
          .warning-title {
            font-size: 24px;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .action-buttons button {
            width: 200px;
            margin: 4px 0;
          }
        }
      `})]})};export{F as default};
