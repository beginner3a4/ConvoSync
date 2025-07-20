import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import NewChatForm from './NewChatForm' ;

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(3, 2, 2, 2),
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 1.5, 1.5, 1.5),
    },
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1.5),
    },
  },
  title: {
    color: 'white',
    fontWeight: 700,
    fontSize: '1.5rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
    },
  },
  divider: {
    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
    height: '1px',
  },
}));

function SideListHeader(props) {
  const classes = useStyles();
  const { sidebarSelectedItem } = props;
  const userId = props.auth.user?._id ;

  return (
    <Box className={classes.header}>
      <Box className={classes.headerContent}>
        <Typography className={classes.title}>
          {sidebarSelectedItem}
        </Typography>
        <Box>
          {sidebarSelectedItem === 'Chat' && (
            <NewChatForm userId={userId} />
          )}
        </Box>
      </Box>
      <Divider className={classes.divider} />
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SideListHeader);
