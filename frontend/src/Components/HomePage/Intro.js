import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Box, Typography, Card, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faComments, 
  faCalendarAlt, 
  faUsers, 
  faShieldAlt, 
  faRocket,
  faPlay,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const styles = (theme) => ({
  root: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      animation: '$float 20s ease-in-out infinite',
    },
  },
  container: {
    position: 'relative',
    zIndex: 2,
  },
  heroSection: {
    textAlign: 'center',
    color: 'white',
    marginBottom: theme.spacing(8),
  },
  title: {
    fontSize: '4rem',
    fontWeight: 800,
    marginBottom: theme.spacing(2),
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
    },
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 400,
    marginBottom: theme.spacing(4),
    opacity: 0.9,
    lineHeight: 1.6,
    maxWidth: '600px',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  buttonContainer: {
    display: 'flex',
    gap: theme.spacing(3),
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(6),
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    padding: '16px 32px',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '50px',
    textTransform: 'none',
    boxShadow: '0 8px 25px rgba(240, 147, 251, 0.4)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 35px rgba(240, 147, 251, 0.6)',
    },
  },
  secondaryButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '14px 30px',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderRadius: '50px',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 35px rgba(255, 255, 255, 0.2)',
    },
  },
  featuresSection: {
    marginTop: theme.spacing(8),
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
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
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
  statsSection: {
    marginTop: theme.spacing(8),
    textAlign: 'center',
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: theme.spacing(3),
    color: 'white',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  statLabel: {
    fontSize: '1rem',
    opacity: 0.8,
    fontWeight: 500,
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
});

class Intro extends Component {
  render() {
    const { classes } = this.props;
    
    const features = [
      {
        icon: faVideo,
        title: 'HD Video Calls',
        description: 'Crystal clear video calls with up to 100 participants. Share your screen and collaborate in real-time.'
      },
      {
        icon: faComments,
        title: 'Instant Messaging',
        description: 'Send messages, share files, and stay connected with your team through our powerful chat system.'
      },
      {
        icon: faCalendarAlt,
        title: 'Smart Scheduling',
        description: 'Schedule meetings, set reminders, and never miss an important call with our integrated calendar.'
      },
      {
        icon: faUsers,
        title: 'Team Collaboration',
        description: 'Create teams, manage projects, and work together seamlessly from anywhere in the world.'
      },
      {
        icon: faShieldAlt,
        title: 'Enterprise Security',
        description: 'Bank-level encryption and security features to keep your conversations private and secure.'
      },
      {
        icon: faRocket,
        title: 'Lightning Fast',
        description: 'Optimized for speed and performance. Connect instantly and experience lag-free communication.'
      }
    ];

    const stats = [
      { number: '10M+', label: 'Active Users' },
      { number: '99.9%', label: 'Uptime' },
      { number: '150+', label: 'Countries' },
      { number: '24/7', label: 'Support' }
    ];

    return (
      <div className={classes.root}>
        <Container maxWidth="xl" className={classes.container}>
          {/* Hero Section */}
          <Box className={classes.heroSection}>
            <Typography variant="h1" className={classes.title}>
              ConvoSync
            </Typography>
            <Typography variant="h4" className={classes.subtitle}>
              Meet, chat, call, and collaborate in just one place. 
              The future of team communication is here.
            </Typography>
            
            <Box className={classes.buttonContainer}>
              {this.props.isAuthenticated ? (
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <Button className={classes.primaryButton} size="large">
                    <FontAwesomeIcon icon={faRocket} style={{ marginRight: '8px' }} />
                    Open ConvoSync
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to='/login' style={{ textDecoration: 'none' }}>
                    <Button className={classes.primaryButton} size="large">
                      <FontAwesomeIcon icon={faPlay} style={{ marginRight: '8px' }} />
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to='/register' style={{ textDecoration: 'none' }}>
                    <Button className={classes.secondaryButton} size="large">
                      Sign Up
                      <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '8px' }} />
                    </Button>
                  </Link>
                </>
              )}
            </Box>
          </Box>

          {/* Features Section */}
          <Box className={classes.featuresSection} id="features">
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
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
          </Box>

          {/* Stats Section */}
          <Box className={classes.statsSection}>
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Card className={classes.statCard}>
                    <CardContent>
                      <Typography variant="h2" className={classes.statNumber}>
                        {stat.number}
                      </Typography>
                      <Typography variant="h6" className={classes.statLabel}>
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Intro);