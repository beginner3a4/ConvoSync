import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: 'flex',
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(0, 1),
  },
  messageWrapper: {
    maxWidth: '70%',
    minWidth: '200px',
  },
  messageSelf: {
    marginLeft: 'auto',
    '& $messageBubble': {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      '&::before': {
        background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
      },
    },
    '& $messageTime': {
      color: 'rgba(255,255,255,0.8)',
    },
  },
  messageBubble: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '18px',
    padding: theme.spacing(1.5, 2),
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
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
      transition: 'opacity 0.2s ease',
    },
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
      '&::before': {
        opacity: 1,
      },
    },
  },
  messageHeader: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#495057',
    marginBottom: theme.spacing(0.5),
  },
  messageContent: {
    color: '#212529',
    lineHeight: 1.5,
    wordWrap: 'break-word',
    marginBottom: theme.spacing(0.5),
  },
  messageTime: {
    fontSize: '0.75rem',
    color: '#6c757d',
    textAlign: 'right',
    fontWeight: 500,
  },
  fileAttachment: {
    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
    color: 'white',
    padding: theme.spacing(1, 1.5),
    borderRadius: '12px',
    marginTop: theme.spacing(1),
    display: 'inline-block',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)',
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(40, 167, 69, 0.4)',
      textDecoration: 'none',
      color: 'white',
    },
  },
}));

function Message(props) {
  const classes = useStyles();
  const { chatMessage, chatTime, userName, userId, fileName, base64String, userMail } =
    props.msg;
  const id = props.auth?.user?._id;

  return (
    <Box className={classes.messageContainer}>
      <Box className={`${classes.messageWrapper} ${userId === id ? classes.messageSelf : ''}`}>
        <Paper className={classes.messageBubble} elevation={0}>
          <Typography 
            className={classes.messageHeader}
            data-tip={userMail}
          >
            {userId !== id ? userName : 'You'}
          </Typography>
          
          <Box className={classes.messageContent}>
            {chatMessage && <Typography variant="body2">{chatMessage}</Typography>}
            }
            
            {fileName && (
              <a 
                href={base64String} 
                download 
                target="_blank" 
                rel="noopener noreferrer"
                className={classes.fileAttachment}
                data-tip="Click to download"
              >
                📎 {fileName}
              </a>
            )}
          </Box>
          
          <Typography className={classes.messageTime}>
            {chatTime}
          </Typography>
        </Paper>
      </Box>
      <ReactTooltip effect="solid" place="top" />
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Message);