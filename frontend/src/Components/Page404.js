import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
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
  container: {
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: theme.spacing(6),
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 2,
  },
  errorCode: {
    fontSize: '8rem',
    fontWeight: 900,
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1,
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  message: {
    fontSize: '1.1rem',
    marginBottom: theme.spacing(4),
    opacity: 0.9,
    maxWidth: '500px',
    margin: '0 auto',
  },
  buttonContainer: {
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '25px',
    fontWeight: 600,
    textTransform: 'none',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(240, 147, 251, 0.4)',
      textDecoration: 'none',
      color: 'white',
    },
  },
  secondaryButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
    },
  },
}));

function Page404() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Box className={classes.container}>
          <Typography className={classes.errorCode}>
            404
          </Typography>
          <Typography variant="h3" className={classes.title}>
            Page Not Found
          </Typography>
          <Typography variant="body1" className={classes.message}>
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </Typography>
          <Box className={classes.buttonContainer}>
            <Link to="/" className={classes.button}>
              <FontAwesomeIcon icon={faHome} />
              Go Home
            </Link>
            <Link to="/dashboard" className={`${classes.button} ${classes.secondaryButton}`}>
              <FontAwesomeIcon icon={faSearch} />
              Dashboard
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Page404;