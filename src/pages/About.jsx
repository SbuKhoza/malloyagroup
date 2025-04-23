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
              Based in Soweto, South Africa, MALLOYA GROUP specializes in developing high-quality websites and mobile applications for Android and iOS, as well as providing UX/UI design services that ensure user-friendly digital experiences.
            </Typography>
            <Typography variant="body1" paragraph>
              We deliver custom-built, fast, and optimized web and mobile solutions for superior performance. Our UX/UI design expertise ensures user-friendly experiences that boost client satisfaction and engagement.
            </Typography>
            <Typography variant="body1" paragraph>
              What sets us apart is our design approach that incorporates design thinking principles, making navigation effortless for end users. Our comprehensive service offerings include website/app development and UI/UX consultancy, specifically catering to startups and growing businesses that need affordable, high-quality web solutions.
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
      <WhyChooseUs />
      <AboutCTA />
    </>
  );
};

export default About;