import {
  faFileCode,
  faFile,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  fileItem: {
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
      background: 'linear-gradient(to bottom, #fa709a, #fee140)',
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
  fileIcon: {
    fontSize: '2.5rem',
    color: '#fa709a',
    filter: 'drop-shadow(0 2px 4px rgba(250, 112, 154, 0.3))',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  pdfIcon: {
    color: '#dc3545',
    filter: 'drop-shadow(0 2px 4px rgba(220, 53, 69, 0.3))',
  },
  codeIcon: {
    color: '#28a745',
    filter: 'drop-shadow(0 2px 4px rgba(40, 167, 69, 0.3))',
  },
  fileName: {
    color: 'white',
    fontWeight: 600,
    fontSize: '1.1rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}));

function FileListItem(props) {
  const classes = useStyles();
  const { setFileSelected,setRoomIdSelected } = props;
  const { file } = props;
  const fileType = file.name.split('.')[1];
  
  const getIconName = () => {
    if (fileType === 'pdf') return faFilePdf;
    if (['cpp', 'js', 'jsx', 'ts', 'tsx', 'py', 'java', 'html', 'css'].includes(fileType)) return faFileCode;
    return faFile;
  };
  
  const getIconClass = () => {
    if (fileType === 'pdf') return `${classes.fileIcon} ${classes.pdfIcon}`;
    if (['cpp', 'js', 'jsx', 'ts', 'tsx', 'py', 'java', 'html', 'css'].includes(fileType)) return `${classes.fileIcon} ${classes.codeIcon}`;
    return classes.fileIcon;
  };

  return (
    <Paper
      className={classes.fileItem}
      elevation={0}
      onClick={() => {
        setFileSelected(file.base64String);
        setRoomIdSelected('') ;
      }}
    >
      <FontAwesomeIcon 
        className={getIconClass()} 
        icon={getIconName()} 
      />
      <Box flex={1} minWidth={0}>
        <Typography className={classes.fileName}>
          {file.name}
        </Typography>
      </Box>
    </Paper>
  );
}

export default FileListItem;
