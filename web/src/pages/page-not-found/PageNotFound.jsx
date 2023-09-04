import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h2">404 Page Not Found</Typography>
        <Button size="large" variant="outlined" onClick={() => navigate('/')}>
          HOME
        </Button>
      </Stack>
    </>
  );
};

export default PageNotFound;
