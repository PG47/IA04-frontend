import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, IconButton, Typography, Container, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/user/login', data);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
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
          Login
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
          Login
        </Button>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={() => navigate('/')} variant="outlined">Home</Button>
          <Button onClick={() => navigate('/register')} variant="outlined">Register</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
