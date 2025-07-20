import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import { io } from 'socket.io-client';
import Message from './Message';

const useStyles = makeStyles((theme) => ({
  chatRoom: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  messagesList: {
    flex: 1,
    overflowY: 'auto',
    background: 'rgba(255, 255, 255, 0.02)',
    padding: theme.spacing(1),
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(to bottom, #667eea, #764ba2)',
      borderRadius: '10px',
      transition: 'background 0.2s ease',
      '&:hover': {
        background: 'linear-gradient(to bottom, #764ba2, #667eea)',
      },
    },
  },
}));

const socket = io.connect(`${process.env.REACT_APP_API_URL}`, {
  transports: ['websocket'],
});

function ChatRoom(props) {
  const classes = useStyles();
  const { roomIdSelected } = props;
  const messagesEndRef = useRef(null);
  const [roomName, setRoomName] = useState('');
  const [msgArray, setMsgArray] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [meet, setMeet] = useState();

  // scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // fetch room details
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/chat/chat-room/${roomIdSelected}`,
        config
      )
      .then((response) => {
        setRoomName(response.data.room.title);
        setMsgArray(response.data.room.msgArray);
        setParticipants(response.data.participants);
        setMeet(response.data.Meet);
      })
      .catch((err) => console.log(err));
  }, [roomIdSelected]);

  useEffect(() => {
    // listener for latest message on selected room
    socket.removeAllListeners(`${roomIdSelected}`);
    socket.on(`${roomIdSelected}`, function (data) {
      setMsgArray((prevState) => {
        return [...prevState, data.finalMsg];
      });
    });

    return (()=>{
    socket.removeAllListeners(`${roomIdSelected}`);
    })
  }, [roomIdSelected]);

  useEffect(() => {
    scrollToBottom();
  }, [msgArray]);

  return (
    <Paper className={classes.chatRoom} elevation={0}>
      <ChatHeader
        participants={participants}
        roomIdSelected={roomIdSelected}
        roomName={roomName}
        meet={meet}
      />
      <Box className={classes.messagesList}>
        {msgArray.length > 0 &&
          msgArray.map((msg, key) => {
            return <Message key={key} msg={msg} />;
          })}
        <div ref={messagesEndRef} />
      </Box>
      <ChatFooter roomIdSelected={roomIdSelected} />
    </Paper>
  );
}

export default ChatRoom;
