import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [userCount, setUserCount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the total user count when the component mounts
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/count');
        setUserCount(response.data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };
    
    fetchUserCount();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: 'center' }}>
      {/* Title */}
      <Typography variant="h3" gutterBottom>
        Homepage
      </Typography>

      {/* Total User Count */}
      {userCount !== null ? (
        <Typography variant="h6">
          Total Users: {userCount}
        </Typography>
      ) : (
        <Typography variant="h6">
          Loading user count...
        </Typography>
      )}

      {/* Navigation Buttons */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
        
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
