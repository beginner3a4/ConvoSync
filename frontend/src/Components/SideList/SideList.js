import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, CircularProgress, Typography, Box } from '@material-ui/core';
import SideListHeader from './SideListHeader';
import axios from 'axios';
import ChatListItem from './ChatListItem';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import FileListItem from '../File/FileListItem';

const useStyles = makeStyles((theme) => ({
  sideList: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  listContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing(1),
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '10px',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.5)',
      },
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  emptyMessage: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    padding: theme.spacing(4),
    fontSize: '1rem',
  },
  progress: {
    color: 'white',
  },
}));

const socket = io.connect(`${process.env.REACT_APP_API_URL}`, {
  transports: ['websocket'],
});

function SideList(props) {
  const classes = useStyles();
  const {
    sidebarSelectedItem,
    setRoomIdSelected,
    roomIdSelected,
    setFileSelected,
  } = props;
  const [chatList, setChatList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };

    if (sidebarSelectedItem === 'Chat') {
      // fetch user chats
      setloading(true);
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/chat/chat-list`, config)
        .then((response) => {
          setloading(false);
          console.log('Chat list response:', response.data);
          setChatList(Array.isArray(response.data.roomsArray) ? response.data.roomsArray : []);
        })
        .catch((err) => {
          setloading(false);
          setChatList([]);
          console.error('Error fetching chat list:', err);
        });
    }

    if (sidebarSelectedItem === 'Files') {
      // fetch user files
      setloading(true);
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/file`, config)
        .then((response) => {
          setloading(false);
          setFileList(Array.isArray(response.data.filesArray) ? response.data.filesArray : []);
        })
        .catch((err) => {
          setloading(false);
          setFileList([]);
          console.error('Error fetching file list:', err);
        });
    }
  }, [sidebarSelectedItem, props.auth.isAuthenticated]); // Re-fetch when auth state changes

  useEffect(() => {
    const userId = props.auth.user?._id;
    
    if (!userId) return;

    // listen socket for creation of room for this user
    socket.removeAllListeners(`create-room-${userId}`);
    socket.on(`create-room-${userId}`, function (data) {
      console.log('Room created:', data.room);
      setChatList((prevState) => {
        return [...prevState, data.room];
      });
    });

    // listen socket for leaving room for this user
    socket.removeAllListeners(`leave-room-${userId}`);
    socket.on(`leave-room-${userId}`, function (data) {
      console.log('Room left:', data.room);
      setChatList((prevState) => {
        return prevState.filter(function (r) {
          return r._id !== data.room._id;
        });
      });
      setRoomIdSelected('');
    });

    // cleanup
    return () => {
      socket.removeAllListeners(`create-room-${userId}`);
      socket.removeAllListeners(`leave-room-${userId}`);
    };
  }, [props.auth.user?._id, setRoomIdSelected]);

  useEffect(() => {}, [roomIdSelected]);

  return (
    <Paper className={classes.sideList} elevation={0}>
      <SideListHeader sidebarSelectedItem={sidebarSelectedItem} />
      <Box className={classes.listContainer}>
        {loading && sidebarSelectedItem !== 'Video Call' ? (
          <Box className={classes.loadingContainer}>
            <CircularProgress className={classes.progress} />
          </Box>
        ) : sidebarSelectedItem === 'Chat' ? (
          Array.isArray(chatList) && chatList.length > 0 ? (
            chatList.map((chat, key) => {
              // Safe check for msgArray
              const msgArray = Array.isArray(chat.msgArray) ? chat.msgArray : [];
              return (
                <ChatListItem
                  key={key}
                  title={chat.title}
                  id={chat._id}
                  lastMsg={
                    msgArray.length > 0
                      ? msgArray[msgArray.length - 1]
                      : null
                  }
                  time={
                    msgArray.length > 0
                      ? msgArray[msgArray.length - 1].chatTime
                      : null
                  }
                  isMeet={chat.Meet ? true : false}
                  setRoomIdSelected={setRoomIdSelected}
                  setFileSelected={setFileSelected}
                />
              );
            })
          ) : (
            <Typography className={classes.emptyMessage}>
              Start a New Chat
            </Typography>
          )
        ) : sidebarSelectedItem === 'Files' ? (
          Array.isArray(fileList) && fileList.length > 0 ? (
            fileList.map((file, key) => (
              <FileListItem
                setFileSelected={setFileSelected}
                setRoomIdSelected={setRoomIdSelected}
                file={file}
                key={key}
              />
            ))
          ) : (
            <Typography className={classes.emptyMessage}>
              No Files to show
            </Typography>
          )
        ) : (
          <Typography className={classes.emptyMessage}>
            Select an option from the sidebar
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SideList);