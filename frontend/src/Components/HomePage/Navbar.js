import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, Box, Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faVideo, faComments, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  appBar: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    padding: '8px 0',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    borderRadius: '12px',
    padding: '8px',
    color: 'white',
    fontSize: '1.5rem',
  },
  title: {
    fontWeight: 700,
    fontSize: '1.8rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  navItem: {
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    fontWeight: 500,
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-2px)',
    },
  },
  loginButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '10px 24px',
    borderRadius: '25px',
    fontWeight: 600,
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    },
  },
  mobileMenu: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar className={classes.toolbar}>
            {/* Logo Section */}
            <Box className={classes.logo}>
              <IconButton className={classes.logoIcon} edge='start'>
                <FontAwesomeIcon icon={faUsers} />
              </IconButton>
              <Typography variant='h4' className={classes.title}>
                ConvoSync
              </Typography>
            </Box>

            {/* Navigation Items */}
            <Box className={classes.navItems}>
              <a href="#features" className={classes.navItem}>
                <FontAwesomeIcon icon={faVideo} />
                Video Calls
              </a>
              <a href="#features" className={classes.navItem}>
                <FontAwesomeIcon icon={faComments} />
                Chat
              </a>
              <a href="#features" className={classes.navItem}>
                <FontAwesomeIcon icon={faCalendarAlt} />
                Calendar
              </a>
            </Box>

            {/* Login Button */}
            {!props.isAuthenticated && (
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <Button className={classes.loginButton}>
                  Sign In
                </Button>
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}