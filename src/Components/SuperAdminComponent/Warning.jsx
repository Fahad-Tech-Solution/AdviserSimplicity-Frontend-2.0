import React, { useEffect, useState } from "react";
import { Card, Alert, Button } from "antd";
import { IoWarningOutline } from "react-icons/io5";

// Mock useLocation hook for demonstration (in real app, import from react-router-dom)
const useLocation = () => {
  return {
    search:
      "?message=System maintenance in progress. Please save your work and try again later.&type=warning",
  };
};

const WarningScreen = () => {
  const location = useLocation();
  const [particles, setParticles] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");
  const [alertType, setAlertType] = useState("warning");

  // Extract message and type from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const message =
      urlParams.get("message") ||
      "An unexpected issue has occurred. Please contact support if this persists.";
    const type = urlParams.get("type") || "warning";

    setWarningMessage(message);
    setAlertType(type);
  }, [location.search]);

  // Generate floating particles for background animation
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="warning-screen">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-overlay"></div>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Warning Card */}
      <div className="card-container">
        <Card
          className="warning-card"
          bordered={false}
          style={{
            maxWidth: 600,
            width: "90%",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="warning-content">
            <div className="warning-icon">
              <IoWarningOutline className="text-6xl text-orange-500 mx-auto mb-4" />
            </div>

            <h2 className="warning-title">System Notice</h2>

            <Alert
              message={warningMessage}
              type={alertType}
              showIcon
              style={{
                marginBottom: "24px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            />

            <div className="action-buttons">
              <Button
                type="default"
                size="large"
                onClick={handleGoBack}
                style={{ marginRight: "12px" }}
              >
                Go Back
              </Button>
              <Button type="primary" size="large" onClick={handleRetry}>
                Retry
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <style jsx>{`
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
            #10b981,
            #059669,
            #047857,
            #065f46
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
              rgba(16, 185, 129, 0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 70% 30%,
              rgba(5, 150, 105, 0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 50% 50%,
              rgba(4, 120, 87, 0.2) 0%,
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
      `}</style>
    </div>
  );
};

export default WarningScreen;
