import { Box, Typography } from "@mui/material";

const StatBox = ({ title, subtitle, bgColor }) => {
  return (
    <Box padding={1} bgcolor={bgColor}>
      <Typography variant="h4" fontWeight="500" fontSize={32} color="white">
        {title}
      </Typography>
      <Typography variant="p" color="white">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default StatBox;
