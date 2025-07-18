import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash,
  faArrowLeft,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    },
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing(3),
    left: theme.spacing(3),
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 10,
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-2px)',
      textDecoration: 'none',
      color: 'white',
    },
  },
  container: {
    position: 'relative',
    zIndex: 2,
  },
  paper: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '24px',
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)',
    },
  },
  avatar: {
    margin: theme.spacing(2),
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    width: theme.spacing(8),
    height: theme.spacing(8),
    boxShadow: '0 8px 25px rgba(67, 233, 123, 0.4)',
  },
  title: {
    color: 'white',
    fontWeight: 700,
    fontSize: '2rem',
    marginBottom: theme.spacing(1),
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(3),
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '12px',
      color: 'white',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#43e97b',
        borderWidth: '2px',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.8)',
      '&.Mui-focused': {
        color: '#43e97b',
      },
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: 'rgba(255, 255, 255, 0.6)',
    },
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    padding: '16px',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '12px',
    textTransform: 'none',
    boxShadow: '0 8px 25px rgba(67, 233, 123, 0.4)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 35px rgba(67, 233, 123, 0.6)',
    },
  },
  link: {
    color: '#43e97b',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#38f9d7',
      textDecoration: 'underline',
    },
  },
}));

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function Register(props) {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const notify = (m) =>
    toast.error(`${m}`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      notify('Password and Confirm Password do not match !');
      return;
    }

    await props.dispatch(register({ name, email, password }));
  };

  const { isAuthenticated } = props.auth;
  const { from } = props.location.state || { from: { pathname: '/dashboard' } };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to={from} />;
  }

  return (
    <div className={classes.root}>
      <Link to='/' className={classes.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Home
      </Link>
      
      <Container component='main' maxWidth='sm' className={classes.container}>
        <CssBaseline />
        <Paper className={classes.paper} elevation={0}>
          <Avatar className={classes.avatar}>
            <FontAwesomeIcon icon={faUsers} size="lg" />
          </Avatar>
          
          <Typography component='h1' variant='h4' className={classes.title}>
            Join ConvoSync
          </Typography>
          
          <Typography variant='body1' className={classes.subtitle}>
            Create your account and start collaborating
          </Typography>
          
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              className={classes.textField}
              autoComplete='name'
              name='name'
              variant='outlined'
              required
              fullWidth
              id='name'
              label='Full Name'
              onChange={handleChange}
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faUser} />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              className={classes.textField}
              variant='outlined'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              className={classes.textField}
              variant='outlined'
              required
              fullWidth
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              id='password'
              onChange={handleChange}
              autoComplete='new-password'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faLock} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              className={classes.textField}
              variant='outlined'
              required
              fullWidth
              name='confirmPassword'
              label='Confirm Password'
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faLock} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className={classes.submitButton}
              size="large"
            >
              Create Account
            </Button>
            
            <Box textAlign="center" mt={3}>
              <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Already have an account?{' '}
                <Link to='/login' className={classes.link}>
                  Sign In
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Register);