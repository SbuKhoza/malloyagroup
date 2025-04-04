import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  Avatar,
  Divider,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';

const AboutHero = () => {
  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #002244 0%, #001a33 100%)', // Navy gradient from Home
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="md">
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 800,
            mb: 3
          }}
        >
          About MALLOYA GROUP
        </Typography>
        <Typography 
          variant="h5"
          sx={{ 
            maxWidth: 700,
            mx: 'auto',
            mb: 4,
            opacity: 0.9
          }}
        >
          Your trusted digital partner for web development, mobile applications, and hosting solutions
        </Typography>
      </Container>
      {/* Add subtle pattern overlay like in Home */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(rgba(240,248,255,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none'
        }}
      />
    </Box>
  );
};

const OurStory = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/api/placeholder/600/400"
              alt="Our Company"
              sx={{ 
                width: '100%',
                borderRadius: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '1px solid rgba(240,248,255,0.5)', // Light blue border like in Home
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom color="#002244">
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              Founded in 2018, MALLOYA GROUP started with a simple mission: to help businesses in South Africa succeed in the digital world by providing high-quality, affordable web solutions.
            </Typography>
            <Typography variant="body1" paragraph>
              What began as a small team of web developers in Cape Town has grown into a full-service digital agency offering comprehensive solutions including website development, mobile applications, UI/UX design, and hosting services.
            </Typography>
            <Typography variant="body1" paragraph>
              We've helped over 200 businesses across South Africa establish and grow their online presence, and we pride ourselves on building long-lasting relationships with our clients based on trust, reliability, and exceptional results.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const CoreValues = () => {
  const values = [
    {
      title: "Client-Focused",
      description: "We put our clients' needs first, ensuring that we deliver solutions that address their specific challenges and goals.",
      icon: <GroupsIcon fontSize="large" />
    },
    {
      title: "Quality Excellence",
      description: "We maintain the highest standards in all our work, from code quality to design aesthetics and user experience.",
      icon: <WorkIcon fontSize="large" />
    },
    {
      title: "Innovation",
      description: "We stay at the forefront of technology trends to bring innovative solutions to our clients.",
      icon: <EmojiObjectsIcon fontSize="large" />
    },
    {
      title: "Integrity",
      description: "We operate with complete transparency and honesty in all our client and team interactions.",
      icon: <BusinessIcon fontSize="large" />
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: '#F0F8FF' }}> {/* Light blue background from Home */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: '#002244' // Navy text like in Home
            }}
          >
            Our Core Values
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              maxWidth: 800,
              mx: 'auto',
              color: 'rgba(0,34,68,0.8)' // Semi-transparent navy like in Home
            }}
          >
            The principles that guide us in everything we do
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: 'white',
                  border: '1px solid rgba(0,34,68,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    borderColor: 'rgba(0,34,68,0.2)'
                  }
                }}
              >
                <Box sx={{ 
                  color: '#002244', // Navy blue from Home
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {value.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold" color="#002244">
                  {value.title}
                </Typography>
                <Typography color="text.secondary">
                  {value.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const MeetTheTeam = () => {
  const team = [
    {
      name: "David Malloya",
      position: "Founder & CEO",
      bio: "With over 15 years of experience in web development and digital marketing, David founded MALLOYA GROUP to help businesses leverage technology for growth.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Amara Ndlovu",
      position: "Lead Developer",
      bio: "Amara leads our development team with expertise in React, Node.js, and mobile app development, ensuring technical excellence in all projects.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Michael Chen",
      position: "UI/UX Designer",
      bio: "Michael brings creativity and user-focused design principles to create intuitive and engaging interfaces for our clients' digital products.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Nomsa Khumalo",
      position: "Project Manager",
      bio: "Nomsa ensures that all our projects are delivered on time and within budget while maintaining clear communication with clients.",
      image: "/api/placeholder/200/200"
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: '#002244' // Navy text like in Home
            }}
          >
            Meet Our Team
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              maxWidth: 800,
              mx: 'auto',
              color: 'rgba(0,34,68,0.8)' // Semi-transparent navy like in Home
            }}
          >
            The talented professionals behind our success
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  height: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid rgba(0,34,68,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    borderColor: 'rgba(0,34,68,0.2)'
                  }
                }}
              >
                <Box
                  component="img"
                  src={member.image}
                  alt={member.name}
                  sx={{ 
                    width: '100%',
                    height: 260,
                    objectFit: 'cover'
                  }}
                />
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom color="#002244">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="#002244" gutterBottom>
                    {member.position}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    "Experienced team with expertise in various technologies",
    "Custom solutions tailored to your specific business needs",
    "Transparent pricing with no hidden costs",
    "Ongoing support and maintenance for all projects",
    "Local South African company with understanding of the local market",
    "Portfolio of successful projects across multiple industries"
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: '#F0F8FF' }}> {/* Light blue background from Home */}
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom color="#002244">
              Why Choose MALLOYA GROUP?
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, color: 'rgba(0,34,68,0.8)' }}>
              We're not just another digital agency. We're a team of passionate professionals dedicated to helping your business succeed in the digital landscape.
            </Typography>
            
            <Box>
              {reasons.map((reason, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Box 
                    sx={{ 
                      minWidth: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: '#002244', // Navy from Home
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      mt: 0.5
                    }}
                  >
                    ✓
                  </Box>
                  <Typography variant="body1" color="rgba(0,34,68,0.8)">
                    {reason}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/api/placeholder/600/400"
              alt="Why Choose Us"
              sx={{ 
                width: '100%',
                borderRadius: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '1px solid rgba(240,248,255,0.5)', // Light blue border like in Home
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const AboutCTA = () => {
  return (
    <Box 
      sx={{
        background: 'linear-gradient(135deg, #002244 0%, #001a33 100%)', // Navy gradient from Home
        color: 'white',
        py: 10,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="md">
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 3
          }}
        >
          Ready to Start Your Digital Journey?
        </Typography>
        <Typography 
          variant="h6"
          sx={{ 
            maxWidth: 700,
            mx: 'auto',
            mb: 4,
            opacity: 0.9
          }}
        >
          Let's discuss how we can help your business grow in the digital landscape
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            size="large"
            component={RouterLink}
            to="/contact"
            sx={{ 
              px: 4, 
              py: 1.5, 
              backgroundColor: '#F0F8FF', // Light blue from Home
              color: '#002244', // Navy blue text
              '&:hover': {
                backgroundColor: '#d7e9fa', // Slightly darker on hover
              }
            }}
          >
            Contact Us
          </Button>
          <Button 
            variant="outlined" 
            color="inherit"
            size="large"
            component={RouterLink}
            to="/services"
            sx={{ px: 4, py: 1.5, borderColor: 'rgba(255,255,255,0.5)' }}
          >
            Our Services
          </Button>
        </Box>
      </Container>
      {/* Add subtle pattern overlay like in Home */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(rgba(240,248,255,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none'
        }}
      />
    </Box>
  );
};

const About = () => {
  return (
    <>
      <AboutHero />
      <OurStory />
      <CoreValues />
      <MeetTheTeam />
      <WhyChooseUs />
      <AboutCTA />
    </>
  );
};

export default About;