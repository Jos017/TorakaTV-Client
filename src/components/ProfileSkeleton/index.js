import React from "react";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

const ProfileSkeleton = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#4e4f50",
        padding: "2rem",
        flexGrow: 1,
        height: "70vh",
        maxWidth: "60rem",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="custom" />
    </Paper>
  );
};

export default ProfileSkeleton;
