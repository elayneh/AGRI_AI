import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { CustomWebcamProps } from "./types";

const CustomWebcam: React.FC<CustomWebcamProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam | null>(null); // Explicitly specify the type for webcamRef
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot(); // Use optional chaining to handle null
    if (imageSrc) {
      setImgSrc(imageSrc);
      onCapture(imageSrc);
    }
  };

  const retake = () => {
    setImgSrc(null);
  };

  const cancelCapture = () => {
    window.location.reload();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "500px",
        width: "400px",
        position: "relative",
        margin: "auto",
      }}
    >
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={300} width={400} ref={webcamRef} />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <div style={{ marginTop: "10px" }}>
            <button
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                margin: "0 10px",
              }}
              onClick={retake}
            >
              Retake photo
            </button>
          </div>
        ) : (
          <div style={{ marginTop: "10px" }}>
            <button
              style={{
                backgroundColor: "green",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                margin: "0 10px",
              }}
              onClick={capture}
            >
              Capture photo
            </button>
            <button
              style={{
                backgroundColor: "#f44336",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                margin: "0 10px",
              }}
              onClick={cancelCapture}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomWebcam;
