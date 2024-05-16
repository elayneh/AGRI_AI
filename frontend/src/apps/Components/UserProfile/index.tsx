import React, { useState } from "react";
import { Button, Card, Typography, CircularProgress } from "@mui/material";
import { PhotoLibrary } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CustomWebcam from "./WebCom";
import PromptModal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectImageFile } from "./slice/selector";
import { useUserProfilePageSlice } from "./slice";
import { UserProfilePageProps } from "./types";

const UserProfilePage: React.FC<UserProfilePageProps> = ({
  diseaseTitle,
  predictedDisease,
  handleImageSubmit,
}) => {
  const { actions } = useUserProfilePageSlice();
  const dispatch = useDispatch();
  const imageFile = useSelector(selectImageFile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCapture = (imageSrc: string | null) => {
    if (imageSrc) {
      const byteCharacters = atob(imageSrc.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const fileName = "captured_image.jpeg";
      const file = new File([blob], fileName, { type: "image/jpeg" });

      dispatch(actions.saveImageInSlice(file));
      setShowWebcam(false); // Hide webcam after capturing image
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      dispatch(actions.saveImageInSlice(files[0]));
      setShowWebcam(false); // Hide webcam after selecting image from file input
    }
  };

  const handleDetectImage = async () => {
    if (imageFile) {
      setLoading(true);
      await handleImageSubmit(imageFile);
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        marginBottom: "70px",
      }}
    >
      {showWebcam ? (
        <CustomWebcam onCapture={handleCapture} />
      ) : (
        <>
          <Card
            style={{
              marginTop: "60px",
              position: "relative",
              top: 0,
              left: 0,
              width: "100%",
              borderBottomWidth: "50px",
              borderBottomColor: "#60E66E",
              borderBottomStyle: "solid",
              paddingBottom: "50px",
              backgroundColor: "white",
              borderBottomRightRadius: "50px",
              borderBottomLeftRadius: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card style={{ flexDirection: "column" }}>
              <Card
                style={{
                  backgroundColor: "#2DBF4E",
                  width: "300px",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                  onChange={handleImageChange}
                />
                <IconButton style={{ color: "white" }}>
                  <PhotoLibrary />
                </IconButton>
              </Card>
              <Card
                style={{
                  backgroundColor: "#2DBF4E",
                  marginTop: "15px",
                  width: "300px",
                  display: "flex",
                  alignItems: "center",
                  padding: "3px",
                  justifyContent: "center",
                }}
              >
                <IconButton onClick={() => setShowWebcam(true)} style={{ color: "white" }}>
                  <Typography>Open Camera</Typography>
                  <CameraAltIcon />
                </IconButton>
              </Card>
            </Card>
          </Card>

          {loading ? (
            <div
              style={{
                width: "95%",
                borderRadius: "20px",
                marginBottom: "20px",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              {diseaseTitle && predictedDisease ? (
                <Card
                  style={{
                    width: "95%",
                    borderRadius: "20px",
                    marginBottom: "20px",
                    padding: "10px",
                    textAlign: "justify",
                    paddingRight: "30px",
                  }}
                >
                  <Typography variant="h5" style={{ color: "green" }}>
                    {diseaseTitle}
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: "black" }}>
                    {predictedDisease}
                  </Typography>
                </Card>
              ) : (
                <Card
                  style={{
                    width: "95%",
                    borderRadius: "20px",
                    marginBottom: "20px",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography>No disease detected</Typography>
                </Card>
              )}

              <Card
                style={{
                  marginTop: "15px",
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#e8f0f7",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Selected Image"
                    style={{ width: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  <Typography>No image captured or selected</Typography>
                )}
              </Card>

              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleDetectImage}
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#60E66E",
                    color: "white",
                    borderRadius: "10px",
                  }}
                >
                  Detect Disease
                </Button>

                {!isModalOpen ? (
                  <Button
                    variant="contained"
                    onClick={handleOpenModal}
                    style={{
                      marginTop: "20px",
                      backgroundColor: "#84a2f1",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    Get AI Suggestion
                  </Button>
                ) : (
                  <PromptModal closeModal={() => setIsModalOpen(false)} />
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
