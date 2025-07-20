import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  CircularProgress, 
  Container, 
  Paper, 
  Typography, 
  Box 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    position: 'relative',
    zIndex: 2,
  },
  title: {
    color: 'white',
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
  progress: {
    color: 'white',
  },
}));

function ChatRoomJoining(props) {
  const classes = useStyles();
  const { chatRoomId } = useParams();
  const userId = props.auth.user?._id;

  useEffect(() => {
    // Check if user is authenticated
    if (!userId) {
      toast.error('Please log in to join the chat room');
      props.history.push('/login');
      return;
    }

    if (!chatRoomId) {
      toast.error('Invalid chat room link');
      props.history.push('/dashboard');
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };

    const body = { userId };

    console.log('Attempting to join room:', chatRoomId, 'with user:', userId);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/chat/invite/${chatRoomId}`,
        body,
        config
      )
      .then((response) => {
        console.log('Join response:', response.data);
        if (response.data.success) {
          toast.success(response.data.msg || 'Successfully joined the chat room!');
          // Add a small delay to show the success message
          setTimeout(() => {
            props.history.push('/dashboard');
          }, 1500);
        } else {
          console.error('Join failed:', response.data.msg);
          toast.error(response.data.msg || 'Failed to join chat room');
          setTimeout(() => {
            props.history.push('/dashboard');
          }, 2000);
        }
      })
      .catch((err) => {
        console.error('Join error:', err.response?.data || err.message);
        const errorMsg = err.response?.data?.msg || 'Unable to join chat room';
        toast.error(errorMsg);
        setTimeout(() => {
          props.history.push('/dashboard');
        }, 2000);
      });

  }, [userId, chatRoomId, props.history]);

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Paper className={classes.paper} elevation={0}>
          <Typography variant="h4" className={classes.title}>
            Joining Chat Room...
          </Typography>
          <Box display="flex" justifyContent="center">
            <CircularProgress className={classes.progress} size={60} />
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth:state.auth,
  };
}

export default connect(mapStateToProps)(ChatRoomJoining);