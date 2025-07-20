import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
  newChatButton: {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    color: 'white',
    borderRadius: '12px',
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: 600,
    textTransform: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.25)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25)',
    },
  },
  iconButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    color: 'white',
    width: '40px',
    height: '40px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
    },
  },
  dialog: {
    '& .MuiDialog-paper': {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    },
  },
  dialogTitle: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '20px 20px 0 0',
    '& .MuiTypography-root': {
      fontWeight: 600,
      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
  },
  dialogContent: {
    background: 'white',
    padding: theme.spacing(3),
  },
  textField: {
    marginTop: theme.spacing(1),
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      background: 'rgba(102, 126, 234, 0.02)',
      '& fieldset': {
        borderColor: 'rgba(102, 126, 234, 0.3)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(102, 126, 234, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#667eea',
        borderWidth: '2px',
      },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: '#667eea',
      },
    },
  },
  dialogActions: {
    background: 'white',
    padding: theme.spacing(2, 3),
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
  },
  actionButton: {
    borderRadius: '12px',
    padding: '8px 24px',
    fontWeight: 600,
    textTransform: 'none',
    transition: 'all 0.3s ease',
  },
  createButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
    },
  },
}));

const socket = io.connect(`${process.env.REACT_APP_API_URL}`, {
  transports: ['websocket'],
});

export default function NewChatForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const { userId } = props;

  const notify = (m) =>
    toast.success(`${m}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRoomTitle('');
  };
  
  const handleChange = (e) => {
    setRoomTitle(e.target.value);
  };

  const handleSubmit = () => {
    if (!roomTitle.trim()) {
      toast.error('Please enter a room name');
      return;
    }
    
    // emit create room action to backend with reqd data
    socket.emit('create-room', { userId: userId, roomTitle: roomTitle });
    notify('Room Created');
    setOpen(false);
    setRoomTitle('');
  };

  return (
    <>
      <IconButton 
        className={classes.iconButton}
        onClick={handleClickOpen}
        size="small"
      >
        <AddIcon />
      </IconButton>
      
      <Dialog
        className={classes.dialog}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id='form-dialog-title' className={classes.dialogTitle}>
          Create New Chat Room
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            className={classes.textField}
            autoFocus
            margin='dense'
            id='roomTitle'
            label='Room Name'
            type='text'
            fullWidth
            variant="outlined"
            value={roomTitle}
            onChange={handleChange}
            placeholder="Enter a name for your chat room"
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button 
            onClick={handleClose} 
            className={classes.actionButton}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            className={`${classes.actionButton} ${classes.createButton}`}
            variant="contained"
          >
            Create Room
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
