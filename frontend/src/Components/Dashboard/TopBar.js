import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  Avatar,
  Chip
} from '@material-ui/core';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import Profile from './Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '0 0 20px 20px',
    margin: '0 16px',
    width: 'calc(100% - 32px)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 3),
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.2rem',
    boxShadow: '0 4px 15px rgba(240, 147, 251, 0.4)',
  },
  title: {
    fontWeight: 700,
    fontSize: '1.5rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  userChip: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontWeight: 500,
    padding: '4px 8px',
    '& .MuiChip-avatar': {
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: 'white',
      fontWeight: 600,
    },
  },
  logoutButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '25px',
    fontWeight: 600,
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 82, 82, 0.2)',
      border: '1px solid rgba(255, 82, 82, 0.3)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(255, 82, 82, 0.3)',
    },
  },
}));

function TopBar(props) {
  const classes = useStyles();

  const handleClick = () => {
    props.dispatch(logout());
  };

  const name = props.auth?.user?.name;
  const email = props.auth?.user?.email;

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  };

  return (
    <AppBar position='static' className={classes.appBar} elevation={0}>
      <Toolbar className={classes.toolbar}>
        {/* Logo Section */}
        <Box className={classes.logo}>
          <Box className={classes.logoIcon}>
            <FontAwesomeIcon icon={faUsers} />
          </Box>
          <Typography variant='h5' className={classes.title}>
            ConvoSync
          </Typography>
        </Box>

        {/* User Section */}
        <Box className={classes.userSection}>
          <Chip
            avatar={<Avatar>{getInitials(name)}</Avatar>}
            }
            label={name}
            className={classes.userChip}
            variant="outlined"
          />
          
          <Button 
            className={classes.logoutButton}
            onClick={handleClick}
            startIcon={<FontAwesomeIcon icon={faSignOutAlt} />}
          >
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(TopBar);