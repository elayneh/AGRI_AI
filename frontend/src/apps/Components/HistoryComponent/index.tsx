import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";
import { HistoryComponentProps } from "./types";

const HistoryComponent = (props: HistoryComponentProps) => {
  const truncateText = (text: string | any[], maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  return (
    <Grid container spacing={3} p={1} mt={2} overflow={'scroll'} mb={7}>
      {props.history && props.history.map((history, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardActionArea
              // component={Link}
              // to={`/user/history/${history._id}`}
            >
              <HistoryImage src={`https://agriaibackend-qwyk.onrender.com/uploads/${history.image}`} alt="Job Image" />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {history.suggestion && truncateText(history.suggestion, 100)}
                </Typography>
                <DateTypography variant="body2" color="textSecondary">
                  Detected: &nbsp;
                  {formatDistanceToNow(new Date(history.createdAt), {
                    addSuffix: true,
                  })}
                </DateTypography>
              </CardContent>
            </CardActionArea>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
  }
`;

const HistoryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const DateTypography = styled(Typography)`
  margin-top: -10px;
  text-align: right;
`;

export default HistoryComponent;
