import { Grid, Typography } from "@mui/material";
import Card from "../../../BasicStyles/Card";
import { Flex } from "../../../BasicStyles/Flex";
import { H1 } from "../../../BasicStyles/Text";
import { Services } from "./constants";
const ServicesComponent = () => {
  return (
    <Flex flexDirection={"column"}>
      <Flex style={{ alignItems: "center", justifyContent: "center" }}>
        <H1 color={"green"}>Services</H1>
      </Flex>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3}>
            {Services.map((service, index) => (
              <Grid key={index} item>
                <Card
                  hight="440px"
                  title={service.title}
                  body={
                    <Typography style={{ textAlign: "justify" }}>
                      {service.body}
                    </Typography>
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Flex>
  );
};

export default ServicesComponent;
