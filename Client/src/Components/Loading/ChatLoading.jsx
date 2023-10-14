import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const ChatLoading = () => {
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Box sx={{ width: 220, marginRight: 0.5, m: 3 }}>
      <Skeleton variant="rectangular" height={60} style={{borderRadius:"5px"}}/>
        <br />
        <Box>
        <Skeleton variant="rectangular" height={60} style={{borderRadius:"5px"}}/>
          <br />
          <Skeleton variant="rectangular" height={60} style={{borderRadius:"5px"}}/>
          <br />
          <Skeleton variant="rectangular" height={60} style={{borderRadius:"5px"}}/>
          <br />
          <Skeleton variant="rectangular" height={60} style={{borderRadius:"5px"}}/>
          <br />
          <Skeleton variant="rectangular" height={60} style={{borderRadius:"5px"}}/>
           <br />
          <Skeleton variant="rectangular" height={60} style={{borderRadius:"5px"}}/>
          <br />
          <Skeleton variant="rectangular" height={60} style={{borderRadius:"5px"}}/>   
        </Box>
      </Box>
    </Grid>
  );
};

export default ChatLoading;
