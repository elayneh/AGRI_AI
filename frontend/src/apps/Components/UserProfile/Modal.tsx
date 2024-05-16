import React, { useState, FormEvent } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextareaAutosize,
  CircularProgress,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { API_ROUTE } from "../../../utils/constants";

interface PromptModalProps {
  closeModal: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ closeModal }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [responseData, setResponseData] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_ROUTE}/api/users/openai`, {
        prompt,
      });
      setResponseData(response.data.completion);
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledDialog open={true} onClose={closeModal}>
      <StyledDialogContent>
        {loading ? (
          <StyledLoaderContainer>
            <CircularProgress size={40} />
          </StyledLoaderContainer>
        ) : responseData ? (
          <>
            <Typography variant="body1">{responseData}</Typography>
            <StyledForm onSubmit={handleSubmit}>
              <StyledTextarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your prompt here..."
                minRows={responseData ? 2 : 5}
                autoFocus={responseData ? false:true}
              />
              <StyledDialogActions>
                <StyledButton variant="contained" type="submit">
                  Prompt
                </StyledButton>
                <StyledButton variant="contained" onClick={closeModal}>
                  Close
                </StyledButton>
              </StyledDialogActions>
              {error && <StyledErrorText>{error}</StyledErrorText>}
            </StyledForm>
          </>
        ) : (
          <StyledForm onSubmit={handleSubmit}>
            <StyledTextarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your prompt here..."
              minRows={5}
              autoFocus
            />
            <StyledDialogActions>
              <StyledButton variant="contained" type="submit">
                Prompt
              </StyledButton>
              <StyledButton variant="contained" onClick={closeModal}>
                Close
              </StyledButton>
            </StyledDialogActions>
            {error && <StyledErrorText>{error}</StyledErrorText>}
          </StyledForm>
        )}
      </StyledDialogContent>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 90%;
    max-width: 700px;
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    max-height: 400px;
  }
`;

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  overflow-y: auto; /* Enable vertical scrolling within the dialog content */
`;

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  // border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  resize: vertical;
`;

const StyledDialogActions = styled(DialogActions)`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const StyledButton = styled(Button)`
  && {
    width: 45%;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    text-transform: none;
  }
`;

const StyledLoaderContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const StyledErrorText = styled(Typography)`
  color: #f44336;
`;

export default PromptModal;
