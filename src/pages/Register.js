import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, IconButton, Typography, Container, Box, Snackbar, SnackbarContent } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/user/register', data);
      setErrorMessage(response.data.message);  // Success message from backend
      //setOpenSnackbar(true);  // Display success notification
      alert(response.data.message);
      setTimeout(() => navigate('/login'), 1500);  // Redirect to login page
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box 
        component="form" 
        onSubmit={handleSubmit(onSubmit)} 
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 5 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
          {...register('email', { 
            required: 'Email is required', 
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
          })}
        />

        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
          {...register('password', { 
            required: 'Password is required', 
            minLength: { value: 6, message: 'Password must be at least 6 characters long' } 
          })}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            )
          }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={() => navigate('/')} variant="outlined">Home</Button>
          <Button onClick={() => navigate('/login')} variant="outlined">Login</Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <SnackbarContent
          message={errorMessage}
          sx={{
            height: '10px',
            backgroundColor: '#333', // Dark background color
            color: '#fff', // White text color for contrast
          }}
        />
      </Snackbar>

    </Container>
  );
}

export default Register;
