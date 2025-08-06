import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box, Grid, Card, CardContent } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faComments, faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    padding: theme.spacing(8, 0),
    color: 'white',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  description: {
    fontSize: '1.2rem',
    textAlign: 'center',
    marginBottom: theme.spacing(6),
    opacity: 0.9,
    maxWidth: '800px',
    margin: '0 auto',
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: 'white',
    height: '100%',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      background: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    },
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: theme.spacing(2),
    color: '#f093fb',
  },
  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  featureDescription: {
    opacity: 0.8,
    lineHeight: 1.6,
  },
}));

function About() {
  const classes = useStyles();

  const features = [
    {
      icon: faVideo,
      title: 'HD Video Calls',
      description: 'Crystal clear video calls with screen sharing and real-time collaboration features.'
    },
    {
      icon: faComments,
      title: 'Instant Messaging',
      description: 'Send messages, share files, and stay connected with your team through our chat system.'
    },
    {
      icon: faCalendarAlt,
      title: 'Smart Scheduling',
      description: 'Schedule meetings, set reminders, and manage your calendar all in one place.'
    },
    {
      icon: faUsers,
      title: 'Team Collaboration',
      description: 'Create teams, manage projects, and work together seamlessly from anywhere.'
    }
  ];

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h1" className={classes.title}>
          About ConvoSync
        </Typography>
        
        <Typography variant="h5" className={classes.description}>
          ConvoSync is a modern communication platform that brings together video calling, 
          instant messaging, and team collaboration in one seamless experience. Built for 
          teams who value efficiency and connection.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Card className={classes.featureCard}>
                <CardContent>
                  <FontAwesomeIcon icon={feature.icon} className={classes.featureIcon} />
                  <Typography variant="h5" className={classes.featureTitle}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" className={classes.featureDescription}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default About;