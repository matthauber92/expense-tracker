import {useEffect} from 'react';
import {Warning} from '@mui/icons-material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Box, Button, Typography, Grid} from '@mui/material';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // List of matched routes
  const matchedRoutes = ['/miami', '/fort-lauderdale', '/florida-keys', '/palm-beach', '/treasure-coast', '/miami/', '/fort-lauderdale/', '/florida-keys/', '/palm-beach/', '/treasure-coast/'];

  useEffect(() => {
    if (matchedRoutes.includes(location.pathname)) {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  return (
    <Grid container sx={{marginTop: 16}} justifyContent="center" alignItems="center" style={{minHeight: '70vh'}}>
      <Grid size={{md: 12}} textAlign="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Warning fontSize="large" sx={{mb: 3, fontSize: 80}}/>
          <Typography variant="h3">404</Typography>
          <Typography variant="h4" sx={{mb: 3}} fontWeight="bold">
            Page Not Found
          </Typography>
          <Typography variant="inherit" sx={{mb: 3}}>
            We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to
            use a search?
          </Typography>
          <Button variant="contained" color="primary">
            <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
              Go Back To Home
            </Link>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NotFound;
