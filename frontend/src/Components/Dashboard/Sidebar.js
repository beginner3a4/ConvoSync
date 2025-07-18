import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Tooltip, Zoom } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faCalendarAlt,
  faFileAlt,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: theme.spacing(2),
    width: '80px',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  iconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    '&:hover': {
      transform: 'translateY(-4px) scale(1.05)',
      boxShadow: '0 12px 25px rgba(0, 0, 0, 0.2)',
      '&::before': {
        opacity: 1,
      },
    },
  },
  icon: {
    fontSize: '1.5rem',
    color: 'rgba(255, 255, 255, 0.7)',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 2,
  },
  activeIcon: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    boxShadow: '0 8px 25px rgba(240, 147, 251, 0.4)',
    '& $icon': {
      color: 'white',
      transform: 'scale(1.1)',
    },
  },
  videoCallIcon: {
    '&$activeIcon': {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
    },
  },
  chatIcon: {
    '&$activeIcon': {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      boxShadow: '0 8px 25px rgba(79, 172, 254, 0.4)',
    },
  },
  calendarIcon: {
    '&$activeIcon': {
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      boxShadow: '0 8px 25px rgba(67, 233, 123, 0.4)',
    },
  },
  filesIcon: {
    '&$activeIcon': {
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      boxShadow: '0 8px 25px rgba(250, 112, 154, 0.4)',
    },
  },
}));

function Sidebar({
  setSidebarSelectedItem,
  setRoomIdSelected,
  setFileSelected,
  sidebarSelectedItem,
}) {
  const classes = useStyles();

  const menuItems = [
    {
      id: 'Video Call',
      icon: faVideo,
      label: 'Video Calls',
      className: classes.videoCallIcon,
    },
    {
      id: 'Chat',
      icon: faComment,
      label: 'Chat Rooms',
      className: classes.chatIcon,
    },
    {
      id: 'Calendar',
      icon: faCalendarAlt,
      label: 'Calendar',
      className: classes.calendarIcon,
    },
    {
      id: 'Files',
      icon: faFileAlt,
      label: 'Files',
      className: classes.filesIcon,
    },
  ];

  const handleItemClick = (item) => {
    setSidebarSelectedItem(item.id);
    setRoomIdSelected('');
    setFileSelected('');
  };

  return (
    <Paper className={classes.sidebar} elevation={0}>
      {menuItems.map((item, index) => (
        <Tooltip
          key={item.id}
          title={item.label}
          placement="right"
          TransitionComponent={Zoom}
          arrow
        >
          <Box
            className={`${classes.iconContainer} ${item.className} ${
              sidebarSelectedItem === item.id ? classes.activeIcon : ''
            }`}
            onClick={() => handleItemClick(item)}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <FontAwesomeIcon icon={item.icon} className={classes.icon} />
          </Box>
        </Tooltip>
      ))}
    </Paper>
  );
}

export default Sidebar;