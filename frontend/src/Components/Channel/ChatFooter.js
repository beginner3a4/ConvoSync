import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Box, IconButton, TextField, InputAdornment } from '@material-ui/core';
import { Send as SendIcon, Mic, MicOff, AttachFile } from '@material-ui/icons';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import SpeechToText from 'speech-to-text';
import FileBase64 from '../File/FileBase64';

const styles = (theme) => ({
  chatFooter: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    border: 'none',
    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '0 0 20px 20px',
    padding: theme.spacing(2),
  },
  footerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  textField: {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      borderRadius: '25px',
      background: 'rgba(102, 126, 234, 0.05)',
      '& fieldset': {
        borderColor: 'rgba(102, 126, 234, 0.2)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(102, 126, 234, 0.4)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#667eea',
      },
    },
    '& .MuiInputLabel-root': {
      '&.Mui-focused': {
        color: '#667eea',
      },
    },
  },
  actionButton: {
    background: 'rgba(102, 126, 234, 0.1)',
    color: '#667eea',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(102, 126, 234, 0.2)',
      transform: 'scale(1.05)',
    },
  },
  sendButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      transform: 'scale(1.05)',
    },
  },
  recordingButton: {
    background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
    color: 'white',
    animation: '$pulse 2s infinite',
  },
  '@keyframes pulse': {
    '0%': {
      boxShadow: '0 0 0 0 rgba(220, 53, 69, 0.7)',
    },
    '70%': {
      boxShadow: '0 0 0 10px rgba(220, 53, 69, 0)',
    },
    '100%': {
      boxShadow: '0 0 0 0 rgba(220, 53, 69, 0)',
    },
  },
});

const socket = io.connect(`${process.env.REACT_APP_API_URL}`, {
  transports: ['websocket'],
});

class ChatFooter extends Component {
  state = {
    msg: '',
    error: '',
    interimText: '',
    finalisedText: [],
    listening: false,
    language: 'en-US',
    file: '',
    fileSelected: false,
  };

  getFile(file) {
    this.setState({ fileSelected: true });
    this.setState({ file });
  }

  handleChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  handleSubmit = (e, roomIdSelected, userName, userId, file,userMail) => {
    e.preventDefault();
    var currentdate = new Date();
    var time = currentdate.getHours() + ':' + currentdate.getMinutes();
    if(this.state.msg.trim() !== '' || file!==''){
      socket.emit('send-msg', {
        userId,
        msgTime: time,
        msg: this.state.msg,
        userName,
        roomIdSelected,
        file,
        userMail,
      });
    }

    this.setState({ msg: '' , fileSelected:false,file:'' });
  };

  onAnythingSaid = (text) => {
    this.setState({ interimText: text });
  };

  onEndEvent = () => {
    if (this.state.listening) {
      this.startListening();
    }
  };

  onFinalised = (text) => {
    this.setState({
      finalisedText: [text, ...this.state.finalisedText],
      interimText: '',
    });
    var t = this.state.finalisedText[0];
    this.setState({ msg: t , fileSelected: false });
  };

  startListening = () => {
    try {
      this.listener = new SpeechToText(
        this.onFinalised,
        this.onEndEvent,
        this.onAnythingSaid,
        this.state.language
      );
      this.listener.startListening();
      this.setState({ listening: true });
    } catch (err) {
      console.log(err);
    }
  };

  stopListening = () => {
    this.listener.stopListening();
    this.setState({ listening: false });
  };

  componentDidUpdate = () => {};

  render() {
    const { classes } = this.props;
    const { msg, file, interimText, listening } =
      this.state;
    const { roomIdSelected } = this.props;
    const userId = this.props.auth.user?._id;
    const userName = this.props.auth.user?.name;
    const userMail = this.props.auth.user?.email;
    
    const displayValue = this.state.fileSelected ? `📎 ${file.name}` : (listening ? interimText : msg);
    
    return (
      <Paper className={classes.chatFooter} elevation={0}>
        <Box 
          component="form" 
          className={classes.footerContent}
          onSubmit={(e) => this.handleSubmit(e, roomIdSelected, userName, userId, file, userMail)}
        >
          <FileBase64 onDone={this.getFile.bind(this)} />
          
          <IconButton
            className={`${classes.actionButton} ${listening ? classes.recordingButton : ''}`}
            onClick={listening ? this.stopListening : this.startListening}
            size="small"
          >
            {listening ? <MicOff /> : <Mic />}
          </IconButton>

          <TextField
            className={classes.textField}
            variant="outlined"
            size="small"
            placeholder={listening ? 'Listening...' : 'Type your message here...'}
            value={displayValue}
            onChange={this.handleChange}
            disabled={listening || this.state.fileSelected}
            InputProps={{
              startAdornment: this.state.fileSelected && (
                <InputAdornment position="start">
                  <AttachFile color="action" />
                </InputAdornment>
              ),
            }}
          />

          <IconButton
            type="submit"
            className={`${classes.actionButton} ${classes.sendButton}`}
            disabled={!msg.trim() && !file}
            size="small"
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(ChatFooter));
