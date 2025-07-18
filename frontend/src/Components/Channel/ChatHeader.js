import {
  faEllipsisV,
  faUserPlus,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/chatroom.css';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue, green, orange } from '@material-ui/core/colors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListIcon from '@material-ui/icons/List';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { io } from 'socket.io-client';
import axios from 'axios';
import { Chip, Badge, IconButton, Fade, Slide, Typography, Box } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import GroupIcon from '@material-ui/icons/Group';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const socket = io.connect(`${process.env.REACT_APP_API_URL}`, {
  transports: ['websocket'],
});

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  headerContainer: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px 16px 0 0',
    padding: '16px 24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
      pointerEvents: 'none',
    }
  },
  roomTitle: {
    color: 'white',
    fontWeight: 600,
    fontSize: '1.5rem',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  participantChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    fontWeight: 500,
    '& .MuiChip-icon': {
      color: 'white',
    }
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: 'white',
    margin: '0 4px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.25)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
    }
  },
  inviteInput: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: '25px',
    padding: '8px 16px',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    minWidth: '250px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    '&:focus': {
      boxShadow: '0 6px 25px rgba(0,0,0,0.15)',
      transform: 'scale(1.02)',
    }
  },
  meetButton: {
    background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(45deg, #45a049 30%, #4CAF50 90%)',
    }
  },
  pulseAnimation: {
    animation: '$pulse 2s infinite',
  },
  '@keyframes pulse': {
    '0%': {
      boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)',
    },
    '70%': {
      boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)',
    },
    '100%': {
      boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
    },
  },
  dialogTitle: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textAlign: 'center',
  },
  participantItem: {
    borderRadius: '12px',
    margin: '4px 0',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f5f5f5',
      transform: 'translateX(8px)',
    }
  }
});

function ChatHeader(props) {
  const { roomName, roomIdSelected, participants, meet } = props;
  const [showInput, setShowInput] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userId = props.auth.user?._id;
  const userEmail = props.auth.user?.email;
  const userName = props.auth.user?.name;
  const [sendTo, setSendTo] = useState('');
  const [showP, setShowP] = useState(false);
  const classes = useStyles();
  const toastId = React.useRef(null);

  const notify = (msg) =>
    (toastId.current = toast.warn(`${msg}`, {
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      autoClose: false,
    }));

  const update = (msg, type) =>
    toast.update(toastId.current, {
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: `${type}`,
      render: `${msg}`,
      autoClose: 2000,
    });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLeaveRoom = () => {
    notify('Leaving Room');
    // emit socket to leave room
    socket.emit('leave-room', { roomIdSelected, userId });
    update('Room Left', 'success');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };

    if(meet){
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/event/${meet._id}`,
          config
        )
        .then((res) => {
          console.log(res) ;
        });
    }
  };

  const handleClickP = () => {
    setShowP(true);
  };

  // send invite mail
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };

    const body = {
      sendTo,
      userEmail,
      userName,
      roomName,
      inviteLink: `${window.location.origin}/invite/${roomIdSelected}`,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/mail`, body, config)
      .then((response) => {
        update(response.data.msg, response.data.type);
      })
      .catch((err) => console.log(err));

    notify(`Sending Mail`);
    setShowInput(false);
    setSendTo('');
  };

  const isMeetingActive = meet && new Date(meet.StartTime).getTime() < new Date().getTime();
  return (
    <Box className={classes.headerContainer}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Left Section - Room Title */}
        <Box display="flex" alignItems="center" flex={1}>
          <Typography className={classes.roomTitle}>
            <GroupIcon style={{ fontSize: '1.8rem' }} />
            {roomName}
          </Typography>
          
          <Chip
            icon={<PersonIcon />}
            label={`${participants.length} members`}
            size="small"
            className={classes.participantChip}
            style={{ marginLeft: '16px' }}
          />
        </Box>

        {/* Center Section - Invite Input */}
        <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
          <Slide direction="down" in={showInput} mountOnEnter unmountOnExit>
            <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                className={classes.inviteInput}
                type='email'
                placeholder='Enter email to send invite...'
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
                autoFocus
              />
              <IconButton 
                type="submit" 
                className={classes.actionButton}
                size="small"
              >
                <SendIcon />
              </IconButton>
            </form>
          </Slide>
        </Box>

        {/* Right Section - Action Buttons */}
        <Box display="flex" alignItems="center" justifyContent="flex-end" flex={1} gap={1}>
          {meet ? (
            isMeetingActive ? (
              <Link to={meet.Description} target='_blank' style={{ textDecoration: 'none' }}>
                <IconButton 
                  className={`${classes.actionButton} ${classes.meetButton} ${classes.pulseAnimation}`}
                  data-tip='Join Live Meeting'
                >
                  <VideoCallIcon />
                </IconButton>
              </Link>
            ) : (
              <Chip
                icon={<VideoCallIcon />}
                label={`Starts ${new Date(meet.StartTime).toLocaleTimeString()}`}
                size="small"
                style={{ 
                  backgroundColor: 'rgba(255,193,7,0.2)', 
                  color: 'white',
                  border: '1px solid rgba(255,193,7,0.5)'
                }}
              />
            )
          ) : (
            <IconButton
              onClick={() => setShowInput(!showInput)}
              className={classes.actionButton}
              data-tip='Invite Members'
            >
              <MailOutlineIcon />
            </IconButton>
          )}

          <Badge badgeContent={participants.length} color="secondary">
            <IconButton
              onClick={handleClickP}
              className={classes.actionButton}
              data-tip='View Participants'
            >
              <GroupIcon />
            </IconButton>
          </Badge>

          <IconButton
            onClick={handleClick}
            className={classes.actionButton}
            data-tip='More Options'
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </IconButton>
        </Box>
      </Box>

      {/* Enhanced Participants Dialog */}
      <Dialog
        onClose={() => setShowP(false)}
        aria-labelledby='participants-dialog-title'
        open={showP}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
      >
        <DialogTitle className={classes.dialogTitle} id='participants-dialog-title'>
          <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
            <GroupIcon />
            Participants ({participants.length})
          </Box>
        </DialogTitle>
        <List style={{ padding: '16px' }}>
          {participants.map((p, index) => (
            <ListItem key={index} className={classes.participantItem}>
              <ListItemAvatar>
                <Avatar 
                  className={classes.avatar}
                  style={{ 
                    backgroundColor: `hsl(${index * 137.5 % 360}, 70%, 60%)`,
                    color: 'white'
                  }}
                >
                  {p.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={p} 
                secondary={index === 0 ? "Room Admin" : "Member"}
              />
            </ListItem>
          ))}
        </List>
      </Dialog>

      {/* Enhanced Menu */}
      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <StyledMenuItem onClick={handleClickP}>
          <ListItemIcon>
            <ListIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='View Participants' />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLeaveRoom} style={{ color: '#f44336' }}>
          <ListItemIcon>
            <ExitToAppIcon fontSize='small' style={{ color: '#f44336' }} />
          </ListItemIcon>
          <ListItemText primary='Leave Room' />
        </StyledMenuItem>
      </StyledMenu>
      
      <ReactTooltip effect="solid" place="bottom" />
    </Box>
  );
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#55868a',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(ChatHeader);
