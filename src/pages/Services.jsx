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
import DevicesIcon from '@mui/icons-material/Devices';
import StorageIcon from '@mui/icons-material/Storage';
import BrushIcon from '@mui/icons-material/Brush';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import BugReportIcon from '@mui/icons-material/BugReport';
import devImage from '../assets/dev.jpg'; 
import appImage from '../assets/app.jpg';
import uiImage from '../assets/ui.jpg';
import testImage from '../assets/test.jpg'; // Placeholder for testing services image
import ServiceCard from '../components/ServiceCard';

const ServicesHero = () => {
  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #002244 0%, #001a33 100%)',
        color: 'white',
        py: 8,
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
          End-to-end digital solutions for your business
        </Typography>
      </Container>
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

const ServicesList = () => {
  const services = [
    {
      title: 'Website Development',
      description: 'Custom responsive websites built to match your brand and meet your business goals.',
      icon: ComputerIcon,
      link: '/services'
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android devices.',
      icon: DevicesIcon,
      link: '/services'
    },
    {
      title: 'Web Hosting',
      description: 'Fast, secure and reliable hosting solutions with 99.9% uptime guarantee.',
      icon: StorageIcon,
      link: '/services'
    },
    {
      title: 'UI/UX Consultation',
      description: 'Expert consultation to enhance user experience and interface design.',
      icon: BrushIcon,
      link: '/services'
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: '#F0F8FF' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: '#002244'
            }}
          >
            Our Services
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              maxWidth: 800,
              mx: 'auto',
              color: 'rgba(0,34,68,0.8)'
            }}
          >
            End-to-end digital solutions for your business
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ServiceCard 
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const WebDevelopment = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box //dev image
              component="img" 
              src={devImage}
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
              <ComputerIcon sx={{ fontSize: 32, mr: 2, color: '#002244' }} />
              <Typography variant="h3" component="h2" fontWeight="bold" color="#002244">
                Website Development
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'medium', color: 'rgba(0,34,68,0.8)' }}>
              Custom websites that drive results
            </Typography>
            <Typography variant="body1" paragraph color="rgba(0,34,68,0.8)">
              We create stunning, responsive websites tailored to your business needs. Our development process focuses on creating user-friendly, high-performing sites that help you achieve your goals.
            </Typography>
            
            <List disablePadding>
              {[
                'From a Standard 4-page Website to a Full-fledged E-commerce Store',
                'Custom CMS development',
                'Booking systems & payment gateways',
                'Appointment scheduling & user management',
                'Mobile-friendly & responsive design',
                'Basic UI customization & SEO optimization',
              ].map((item, index) => (
                <ListItem key={index} disableGutters sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon sx={{ color: '#002244' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} sx={{ color: 'rgba(0,34,68,0.8)' }} />
                </ListItem>
              ))}
            </List>
            
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ 
                mt: 3,
                backgroundColor: '#002244',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#001a33',
                }
              }}
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
    <Box sx={{ py: 8, backgroundColor: '#F0F8FF' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneAndroidIcon sx={{ fontSize: 32, mr: 2, color: '#002244' }} />
              <Typography variant="h3" component="h2" fontWeight="bold" color="#002244">
                Mobile App Development
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'medium', color: 'rgba(0,34,68,0.8)' }}>
              Native and cross-platform apps for iOS and Android
            </Typography>
            <Typography variant="body1" paragraph color="rgba(0,34,68,0.8)">
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
                    <CheckCircleOutlineIcon sx={{ color: '#002244' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} sx={{ color: 'rgba(0,34,68,0.8)' }} />
                </ListItem>
              ))}
            </List>
            
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ 
                mt: 3,
                backgroundColor: '#002244',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#001a33',
                }
              }}
            >
              Discuss Your App
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={appImage}
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
    <Box sx={{ py: 8, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={uiImage}
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
              <DesignServicesIcon sx={{ fontSize: 32, mr: 2, color: '#002244' }} />
              <Typography variant="h3" component="h2" fontWeight="bold" color="#002244">
                UI/UX Consultation
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'medium', color: 'rgba(0,34,68,0.8)' }}>
              Create intuitive, user-centered designs
            </Typography>
            <Typography variant="body1" paragraph color="rgba(0,34,68,0.8)">
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
                    <CheckCircleOutlineIcon sx={{ color: '#002244' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} sx={{ color: 'rgba(0,34,68,0.8)' }} />
                </ListItem>
              ))}
            </List>
            
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ 
                mt: 3,
                backgroundColor: '#002244',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#001a33',
                }
              }}
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
    <Box sx={{ py: 8, backgroundColor: '#F0F8FF' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BugReportIcon sx={{ fontSize: 32, mr: 2, color: '#002244' }} />
              <Typography variant="h3" component="h2" fontWeight="bold" color="#002244">
                Testing Services
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'medium', color: 'rgba(0,34,68,0.8)' }}>
              Ensure quality and performance
            </Typography>
            <Typography variant="body1" paragraph color="rgba(0,34,68,0.8)">
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
                    <CheckCircleOutlineIcon sx={{ color: '#002244' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} sx={{ color: 'rgba(0,34,68,0.8)' }} />
                </ListItem>
              ))}
            </List>
            
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ 
                mt: 3,
                backgroundColor: '#002244',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#001a33',
                }
              }}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={testImage}
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
              color: '#002244'
            }}
          >
            Our Development Process
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              maxWidth: 800,
              mx: 'auto',
              color: 'rgba(0,34,68,0.8)'
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
                  border: '1px solid rgba(0,34,68,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,34,68,0.1)'
                  }
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
                      backgroundColor: '#002244',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 20,
                      mb: 2
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold" color="#002244">
                    {step.title}
                  </Typography>
                  <Typography color="rgba(0,34,68,0.8)">
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
        background: 'linear-gradient(135deg, #002244 0%, #001a33 100%)',
        color: 'white',
        py: 8,
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
          size="large"
          component={RouterLink}
          to="/contact"
          sx={{ 
            px: 5, 
            py: 1.5, 
            backgroundColor: '#F0F8FF',
            color: '#002244',
            '&:hover': {
              backgroundColor: '#d7e9fa',
            }
          }}
        >
          Contact Us
        </Button>
      </Container>
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

const Services = () => {
  return (
    <>
      <ServicesHero />
      <ServicesList />
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