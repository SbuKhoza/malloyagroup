import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import BugReportIcon from '@mui/icons-material/BugReport';

import ServiceCard from '../components/ServiceCard';

const ServicesHero = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: 'primary.main',
        color: 'white',
        py: 8,
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 3
          }}
        >
          Our Digital Services
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
          We offer comprehensive digital solutions to help your business thrive in the digital landscape
        </Typography>
      </Container>
    </Box>
  );
};

const WebDevelopment = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/api/placeholder/600/400"
              alt="Web Development"
              sx={{ 
                width: '100%',
                borderRadius: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ComputerIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
              <Typography variant="h3" component="h2" fontWeight="bold">
                Website Development
              </Typography>
            </Box>
            <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
              Custom websites that drive results
            </Typography>
            <Typography variant="body1" paragraph>
              We create stunning, responsive websites tailored to your business needs. Our development process focuses on creating user-friendly, high-performing sites that help you achieve your goals.
            </Typography>
            
            <List disablePadding>
              {[
                'Standard 4-page Website Package - R3,500',
                'Mobile-friendly & responsive design',
                'Basic UI customization & SEO optimization',
                'E-commerce integration available',
                'Content Management System integration'
              ].map((item, index) => (
                <ListItem key={index} disableGutters sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ mt: 3 }}
            >
              Start Your Project
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const MobileAppDevelopment = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneAndroidIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
              <Typography variant="h3" component="h2" fontWeight="bold">
                Mobile App Development
              </Typography>
            </Box>
            <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
              Native and cross-platform apps for iOS and Android
            </Typography>
            <Typography variant="body1" paragraph>
              We design and develop user-friendly mobile applications that deliver exceptional user experiences across all devices. Our mobile solutions help businesses engage customers and streamline operations.
            </Typography>
            
            <List disablePadding>
              {[
                'Native iOS and Android development',
                'Cross-platform solutions (React Native, Flutter)',
                'UI/UX design optimized for mobile',
                'Integration with existing systems',
                'Ongoing maintenance and support'
              ].map((item, index) => (
                <ListItem key={index} disableGutters sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ mt: 3 }}
            >
              Discuss Your App
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/api/placeholder/600/400"
              alt="Mobile App Development"
              sx={{ 
                width: '100%',
                borderRadius: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const UXConsultation = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/api/placeholder/600/400"
              alt="UI/UX Consultation"
              sx={{ 
                width: '100%',
                borderRadius: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DesignServicesIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
              <Typography variant="h3" component="h2" fontWeight="bold">
                UI/UX Consultation
              </Typography>
            </Box>
            <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
              Create intuitive, user-centered designs
            </Typography>
            <Typography variant="body1" paragraph>
              Our UI/UX consultations help you create digital products that users love. We focus on user research, intuitive interfaces, and seamless experiences to increase engagement and conversion.
            </Typography>
            
            <List disablePadding>
              {[
                'User research and persona development',
                'Wireframing and prototyping',
                'Usability testing and analysis',
                'Visual design and branding',
                'Accessibility compliance'
              ].map((item, index) => (
                <ListItem key={index} disableGutters sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ mt: 3 }}
            >
              Book a Consultation
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const TestingServices = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BugReportIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
              <Typography variant="h3" component="h2" fontWeight="bold">
                Testing Services
              </Typography>
            </Box>
            <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
              Ensure quality and performance
            </Typography>
            <Typography variant="body1" paragraph>
              Our comprehensive testing services ensure your digital products work flawlessly across all devices and scenarios. We identify and fix issues before they impact your users.
            </Typography>
            
            <List disablePadding>
              {[
                'Functional and regression testing',
                'Performance and load testing',
                'Cross-browser and cross-device testing',
                'Security and penetration testing',
                'Automated testing solutions'
              ].map((item, index) => (
                <ListItem key={index} disableGutters sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ mt: 3 }}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/api/placeholder/600/400"
              alt="Testing Services"
              sx={{ 
                width: '100%',
                borderRadius: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      title: "Discovery",
      description: "We start by understanding your business needs, goals and target audience to create a tailored strategy."
    },
    {
      title: "Planning & Design",
      description: "Our team develops wireframes, mockups and prototypes to visualize the solution before development begins."
    },
    {
      title: "Development",
      description: "We build your digital product using the latest technologies and best practices for optimal performance."
    },
    {
      title: "Testing",
      description: "Rigorous testing ensures your product works flawlessly across all devices and scenarios."
    },
    {
      title: "Deployment",
      description: "We launch your product and provide training to ensure a smooth transition."
    },
    {
      title: "Support",
      description: "Our team offers ongoing maintenance and support to keep your digital products running smoothly."
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2
            }}
          >
            Our Development Process
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ 
              maxWidth: 800,
              mx: 'auto' 
            }}
          >
            A structured approach to deliver quality digital solutions
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 20,
                      mb: 2
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    {step.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const ServicesCTA = () => {
  return (
    <Box 
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 8,
        textAlign: 'center'
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
          Let's Build Your Next Digital Project
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
          Contact us today to discuss your requirements and get a free consultation
        </Typography>
        <Button 
          variant="contained" 
          color="secondary"
          size="large"
          component={RouterLink}
          to="/contact"
          sx={{ px: 5, py: 1.5 }}
        >
          Contact Us
        </Button>
      </Container>
    </Box>
  );
};

const Services = () => {
  return (
    <>
      <ServicesHero />
      <WebDevelopment />
      <MobileAppDevelopment />
      <UXConsultation />
      <TestingServices />
      <ProcessSection />
      <ServicesCTA />
    </>
  );
};

export default Services;