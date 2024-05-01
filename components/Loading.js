import { CircularProgress, Box } from '@mui/material';

export const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="92vh"
    >
      <CircularProgress />
    </Box>
  );
};
