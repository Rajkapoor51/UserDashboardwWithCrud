import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import './App.css';

export default function User() {
  const getEmail = localStorage.getItem("email");
  const getName = localStorage.getItem("name");
  const getPhoto = localStorage.getItem("photo"); // Assuming "photo" is a URL to the user's photo
  // const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Box className="card-container">
            <Avatar alt="User Photo" src={getPhoto} className="avatar-image" sx={{ width: 150, height: 150 }} />
            <div>
              <Typography variant="h4" className="bold-text">
                {getName}
              </Typography>
              <Typography variant="h6" className="normal-text">{getEmail}</Typography>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
