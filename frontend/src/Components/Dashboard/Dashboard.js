import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Fade } from '@material-ui/core';
import Display from './Display';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import SideList from '../SideList/SideList';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    },
  },
  container: {
    position: 'relative',
    zIndex: 2,
    padding: 0,
    maxWidth: 'none',
  },
  mainArea: {
    display: 'flex',
    height: 'calc(100vh - 80px)',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
  sidebar: {
    flexShrink: 0,
  },
  sideList: {
    flexShrink: 0,
    width: '320px',
  },
  display: {
    flex: 1,
    minWidth: 0,
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const [sidebarSelectedItem, setSidebarSelectedItem] = useState('Video Call');
  const [roomIdSelected, setRoomIdSelected] = useState('');
  const [fileSelected, setFileSelected] = useState('');
  const userId = props.auth.user?._id;

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <TopBar />
        <Fade in timeout={800}>
          <Box className={classes.mainArea}>
            <Box className={classes.sidebar}>
              <Sidebar
                setRoomIdSelected={setRoomIdSelected}
                setFileSelected={setFileSelected}
                setSidebarSelectedItem={setSidebarSelectedItem}
                sidebarSelectedItem={sidebarSelectedItem}
              />
            </Box>
            
            {sidebarSelectedItem !== 'Calendar' && (
              <Fade in timeout={1000}>
                <Box className={classes.sideList}>
                  <SideList
                    sidebarSelectedItem={sidebarSelectedItem}
                    setFileSelected={setFileSelected}
                    setRoomIdSelected={setRoomIdSelected}
                    roomIdSelected={roomIdSelected}
                  />
                </Box>
              </Fade>
            )}
            
            <Fade in timeout={1200}>
              <Box className={classes.display}>
                <Display
                  fileSelected={fileSelected}
                  roomIdSelected={roomIdSelected}
                  sidebarSelectedItem={sidebarSelectedItem}
                  userId={userId}
                />
              </Box>
            </Fade>
          </Box>
        </Fade>
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Dashboard);