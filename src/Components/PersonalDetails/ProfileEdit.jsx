import React, { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import { Button, Popconfirm, Carousel, Upload } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  InboxOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

import imageCompression from "browser-image-compression"; // ✅ lightweight lib to compress
import { defaultUrl, PersonalDetailsData } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { PatchAxios } from "../Assets/Api/Api";

const { Dragger } = Upload;

// ✅ Import avatars dynamically
const boyImages = import.meta.glob("../Questions/svgs/avatar-boy-(*).png", {
  eager: true,
});
const girlImages = import.meta.glob("../Questions/svgs/avatar-girl-(*).png", {
  eager: true,
});

const avatarBoys = Object.keys(boyImages)
  .sort()
  .map((key) => boyImages[key].default);

const avatarGirls = Object.keys(girlImages)
  .sort()
  .map((key) => girlImages[key].default);

const ProfileEdit = (props) => {
  const { modalObject, flagState, setFlagState } = props;

  const initialValues = {
    image: modalObject?.Data?.image?.url || null,
  };

  const [fileList, setFileList] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);
  const carouselRef = useRef(null);
  const fileInputRef = useRef(null);
  let DefaultUrl = useRecoilValue(defaultUrl);
  const [personalDetailObj, setPersonalDetailObj] =
    useRecoilState(PersonalDetailsData);

  const avatarList = [...avatarBoys, ...avatarGirls];

  const handleUploadChange = (file, setFieldValue) => {
    setFieldValue("image", file);
    setFileList([file]);
    // Navigate to upload slide (index 0) after upload
    carouselRef.current?.goTo(0);
    setCenterIndex(0);
    return false;
  };

  const handleDelete = (setFieldValue) => {
    setFileList([]);
    setFieldValue("image", null);
    // Navigate back to upload slide (no image)
    carouselRef.current?.goTo(0);
    setCenterIndex(0);
  };

  const onSubmit = async (values) => {
    console.log("Final Image Data:", values);

    const formData = new FormData();

    try {
      if (values.image) {
        // Case 1: Avatar image (already uploaded URL)
        if (values.image.url && typeof values.image.url === "string") {
          //   formData.append("avatarUrl", values.image.url);
          setPersonalDetailObj((prev) => ({
            ...prev,
            [modalObject.owner]: {
              ...prev[modalObject.owner],
              image: { url: values.image.url },
            },
          }));

          if (props.flagState) {
            props.setFlagState(false);
          }
          return false;
        }

        // Case 2: User uploaded File
        else if (values.image instanceof File) {
          let fileToUpload = values.image;

          // Check size
          if (fileToUpload.size > 1024 * 1024) {
            // Compress image if > 1MB
            const compressedFile = await imageCompression(fileToUpload, {
              maxSizeMB: 1,
              maxWidthOrHeight: 1024,
              useWebWorker: true,
            });

            fileToUpload = compressedFile;
            console.log(
              "Compressed file size:",
              fileToUpload.size / 1024,
              "KB"
            );
          }

          formData.append("image", fileToUpload);
        }
      }

      // Debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }

      formData.append("type", modalObject.owner);

      console.log("Updating ID:", personalDetailObj._id);

      // ✅ API call
      const res = await PatchAxios(
        DefaultUrl +
          "/api/personalDetails/updateImage/" +
          personalDetailObj._id,
        formData
      );

      const data = await res;
      console.log("Upload Response:", data);

      // ✅ Save image object in Recoil state
      if (data?.image) {
        setPersonalDetailObj((prev) => ({
          ...prev,
          [modalObject.owner]: {
            ...prev[modalObject.owner],
            image: data.image,
          },
        }));
      }

      // ✅ close modal
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const getCurrentImage = (values) => {
    if (values.image) {
      return values.image.url
        ? values.image.url
        : URL.createObjectURL(values.image);
    }
    return null;
  };

  const goToPrev = () => carouselRef.current?.prev();
  const goToNext = () => carouselRef.current?.next();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue }) => {
        const currentImage = getCurrentImage(values);

        // Auto-select center image when carousel changes
        useEffect(() => {
          if (centerIndex === 0) {
            // Upload slide - don't auto-select
            return;
          }

          const avatarIndex = centerIndex - 1;
          if (avatarIndex >= 0 && avatarIndex < avatarList.length) {
            const centerAvatar = avatarList[avatarIndex];
            setFieldValue("image", { url: centerAvatar });
          }
        }, [centerIndex]);

        const draggerProps = {
          name: "file",
          multiple: false,
          accept: "image/*",
          showUploadList: false,
          beforeUpload: (file) => handleUploadChange(file, setFieldValue),
        };

        const handleFileInputChange = (e) => {
          if (e.target.files.length > 0) {
            handleUploadChange(e.target.files[0], setFieldValue);
          }
        };

        const handleUploadClick = () => {
          fileInputRef.current?.click();
        };

        return (
          <Form>
            <div className="d-flex flex-column align-items-center gap-3">
              {/* Carousel with Avatar Slider */}
              <div
                style={{ position: "relative", width: 400, padding: "20px 0" }}
              >
                {/* Left Navigation */}
                <Button
                  icon={<LeftOutlined />}
                  onClick={goToPrev}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: -50,
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                />

                {/* Right Navigation */}
                <Button
                  icon={<RightOutlined />}
                  onClick={goToNext}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: -50,
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                />

                <Carousel
                  ref={carouselRef}
                  dots={false}
                  infinite
                  slidesToShow={3}
                  centerMode
                  centerPadding="0px"
                  beforeChange={(_, next) => setCenterIndex(next)}
                >
                  {/* Upload Slide */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "0 10px",
                      }}
                    >
                      <div
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: "50%",
                          border:
                            centerIndex === 0
                              ? "3px solid #36b446"
                              : "1px solid #ddd",
                          background: "#fafafa",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        {currentImage && !avatarList.includes(currentImage) ? (
                          <img
                            src={currentImage}
                            alt="Uploaded"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Dragger
                            {...draggerProps}
                            style={{
                              width: "100%",
                              height: "100%",
                              border: "none",
                              background: "transparent",
                              borderRadius: "50%",
                            }}
                          >
                            <div
                              style={{ textAlign: "center", padding: "10px 0" }}
                            >
                              <p style={{ margin: 0 }}>
                                <InboxOutlined
                                  style={{ fontSize: 32, color: "#36b446" }}
                                />
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 10,
                                  color: "#999",
                                }}
                              >
                                Drag & Drop
                              </p>
                            </div>
                          </Dragger>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Avatar Slides */}
                  {avatarList.map((avatar, index) => {
                    const slideIndex = index + 1;
                    const isCenter = centerIndex === slideIndex;

                    return (
                      <div key={index}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "0 10px",
                          }}
                        >
                          <div
                            style={{
                              width: 120,
                              height: 120,
                              borderRadius: "50%",
                              overflow: "hidden",
                              border: isCenter
                                ? "3px solid #36b446"
                                : "1px solid #ddd",
                              cursor: "pointer",
                              transition: "all 0.3s",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#f9f9f9",
                            }}
                            onClick={() => {
                              setFieldValue("image", { url: avatar });
                              carouselRef.current?.goTo(slideIndex);
                            }}
                          >
                            <img
                              src={avatar}
                              alt={`avatar-${index}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                {values.image && (
                  <Popconfirm
                    title="Remove this profile image?"
                    onConfirm={() => handleDelete(setFieldValue)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger icon={<DeleteOutlined />}>
                      Remove
                    </Button>
                  </Popconfirm>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  onClick={handleUploadClick}
                >
                  {values.image ? "Replace Image" : "Upload Image"}
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfileEdit;
