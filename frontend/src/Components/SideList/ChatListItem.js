import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar, Paper } from '@material-ui/core';
import { io } from 'socket.io-client';
import {
  faPhoneSquareAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
  chatItem: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0),
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '4px',
      height: '100%',
      background: 'linear-gradient(to bottom, #667eea, #764ba2)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
      '&::before': {
        opacity: 1,
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
      gap: theme.spacing(1.5),
    },
  },
  avatar: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    width: '48px',
    height: '48px',
    fontSize: '1.5rem',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    [theme.breakpoints.down('sm')]: {
      width: '40px',
      height: '40px',
      fontSize: '1.2rem',
    },
  },
  meetAvatar: {
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    boxShadow: '0 4px 12px rgba(67, 233, 123, 0.3)',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: 'white',
    fontWeight: 600,
    fontSize: '1.1rem',
    marginBottom: theme.spacing(0.5),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  lastMessage: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '180px',
    lineHeight: 1.4,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
      maxWidth: '150px',
    },
  },
  time: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.75rem',
    flexShrink: 0,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },
}));

const socket = io.connect(`${process.env.REACT_APP_API_URL}`, {
  transports: ['websocket'],
});

function ChatListItem(props) {
  const classes = useStyles();
  const {
    title,
    id,
    time,
    lastMsg,
    setRoomIdSelected,
    setFileSelected,
    isMeet,
  } = props;

  const [lastMessage, setLastMessage] = useState(lastMsg);
  const [lastTime, setLastTime] = useState(time);

  useEffect(() => {
    // socket for dynamic update of last message
    socket.removeAllListeners(`${id}-lastMessage`);
    socket.on(`${id}-lastMessage`, (data) => {
      setLastMessage(data.finalMsg);
      setLastTime(data.finalMsg.chatTime);
    });

    // cleanup
    return () => {
      socket.removeAllListeners(`${id}-lastMessage`);
    };
  }, [id]);

  const getLastMessageText = () => {
    if (!lastMessage) return '';
    if (lastMessage.chatMessage && lastMessage.chatMessage.trim() !== '') {
      return lastMessage.chatMessage;
    }
    if (lastMessage.fileName) {
      return `📎 ${lastMessage.fileName}`;
    }
    return '';
  };

  return (
    <Paper
      className={classes.chatItem}
      elevation={0}
      onClick={() => {
        setRoomIdSelected(id);
        setFileSelected('');
      }}
    >
      <Avatar className={`${classes.avatar} ${isMeet ? classes.meetAvatar : ''}`}>
        <FontAwesomeIcon 
          icon={isMeet ? faPhoneSquareAlt : faUserCircle} 
        />
      </Avatar>
      
      <Box className={classes.content}>
        <Typography className={classes.title}>
          {title}
        </Typography>
        <Typography className={classes.lastMessage}>
          {getLastMessageText()}
        </Typography>
      </Box>
      
      {lastTime && (
        <Typography className={classes.time}>
          {lastTime}
        </Typography>
      )}
    </Paper>
  );
}

export default ChatListItem;
