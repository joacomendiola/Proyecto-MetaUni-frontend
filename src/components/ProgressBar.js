import React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";

export default function ProgressBar({ value, color }) {
  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <Typography variant="body1">{Math.round(value)}%</Typography>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: color || "#673ab7"
          }
        }}
      />
    </Box>
  );
}