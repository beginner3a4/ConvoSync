import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHome } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  container: {
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: theme.spacing(6),
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    fontSize: '4rem',
    color: '#f093fb',
    marginBottom: theme.spacing(3),
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: theme.spacing(4),
    opacity: 0.9,
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
}));

function ErrorPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Box className={classes.container}>
          <FontAwesomeIcon icon={faExclamationTriangle} className={classes.icon} />
          <Typography variant="h2" className={classes.title}>
            Unable to Join Room
          </Typography>
          <Typography variant="body1" className={classes.message}>
            Sorry, we couldn't connect you to the requested room. The room may not exist or you may not have permission to access it.
          </Typography>
          <Link to="/dashboard" className={classes.button}>
            <FontAwesomeIcon icon={faHome} />
            Return to Dashboard
          </Link>
        </Box>
      </Container>
    </div>
  );
}

export default ErrorPage;