import React, { useState } from "react";
import { Button, Card, Grid } from "antd";
import { FaDownload } from "react-icons/fa";
import DownloadSVG from "../svgs/DownloadSVG";
import { GeneraDocument } from "../../Assets/Api/Api";
import { useRecoilState } from "recoil";
import { SelectedClientDetails } from "../../../Store/Store";
const { useBreakpoint } = Grid;
const DownloadSection = () => {
  const [downLoadLeading, setDownLoadLeading] = useState(false);
  const [selectedClientDetails, setSelectedClientDetails] = useRecoilState(
    SelectedClientDetails,
  );
  const screens = useBreakpoint();
  return (
    <div
      //   style={{
      //     minHeight: "70vh",
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     padding: "24px",
      //   }}
      className="download-wrapper"
    >
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />

      <Card
        bordered={false}
        style={{
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          borderRadius: 16,
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Icon */}
        <div
          style={{ marginBottom: 16 }}
          className={
            screens.xxl
              ? ""
              : "d-flex justify-content-center align-items-center "
          }
        >
          <div style={{ width: screens.xxl ? "auto" : "70%" }}>
            <DownloadSVG />
          </div>
        </div>

        {/* Title */}
        <h2 style={{ marginBottom: 8 }}>Your document is ready</h2>

        {/* Description */}
        <p style={{ color: "#666", marginBottom: 24 }}>
          Click the button below to download your document securely to your
          device.
        </p>

        {/* CTA */}
        <Button
          type="primary"
          size="large"
          icon={<FaDownload />}
          style={{
            borderRadius: 8,
            paddingInline: 24,
          }}
          onClick={async () => {
            try {
              setDownLoadLeading(true);
              await GeneraDocument(selectedClientDetails._id);
            } catch (err) {
              console.error("Document Download Error:", err);
            } finally {
              setDownLoadLeading(false);
            }
          }}
          disabled={downLoadLeading}
          loading={downLoadLeading}
        >
          Download Document
        </Button>
      </Card>
    </div>
  );
};

export default DownloadSection;
