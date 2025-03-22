import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ComputerIcon from '@mui/icons-material/Computer';
import DevicesIcon from '@mui/icons-material/Devices';
import StorageIcon from '@mui/icons-material/Storage';
import BrushIcon from '@mui/icons-material/Brush';
import SpeedIcon from '@mui/icons-material/Speed';

// Import components
import ServiceCard from '../components/ServiceCard';
import HostingPlans from '../components/HostingPlans';

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box 
      sx={{ 
        backgroundColor: 'primary.main',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h1" 
              component="h1"
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2
              }}
            >
              Bringing Your Digital Ideas To Life
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 400,
                mb: 4,
                opacity: 0.9
              }}
            >
              Custom mobile & web solutions that power your business growth
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="secondary"
                size="large"
                component={RouterLink}
                to="/contact"
                sx={{ px: 4, py: 1.5 }}
              >
                Get Started
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
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box 
              component="img"
              src="/api/placeholder/600/400"
              alt="Digital solutions"
              sx={{ 
                width: '100%',
                borderRadius: 2,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const Services = () => {
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
      link: '/hosting'
    },
    {
      title: 'UI/UX Consultation',
      description: 'Expert consultation to enhance user experience and interface design.',
      icon: BrushIcon,
      link: '/services'
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
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
            Our Services
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ 
              maxWidth: 800,
              mx: 'auto' 
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

const WebsitePackage = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'primary.main', color: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              Standard Website Package
            </Typography>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'medium' }}>
              R3,500
            </Typography>
            <Typography variant="h6" gutterBottom>
              For a 4-page website with essential features
            </Typography>
            <Box sx={{ my: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box component="span" sx={{ mr: 1, color: 'secondary.main' }}>✅</Box>
                    <Typography>Mobile-friendly design</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box component="span" sx={{ mr: 1, color: 'secondary.main' }}>✅</Box>
                    <Typography>Basic UI customization</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box component="span" sx={{ mr: 1, color: 'secondary.main' }}>✅</Box>
                    <Typography>Basic SEO setup</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box component="span" sx={{ mr: 1, color: 'secondary.main' }}>✅</Box>
                    <Typography>Contact form integration</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Timeline: 3-5 business days
              <br />
              Additional Pages: R500 per page
            </Typography>
            <Button 
              variant="contained" 
              color="secondary"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ px: 4, py: 1.5 }}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ backgroundColor: 'rgba(255,255,255,0.1)', p: 4, borderRadius: 2 }}>
              <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                E-Commerce Add-On
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium' }}>
                R6,000
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Transform your website into a fully-functional online store:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box component="span" sx={{ mr: 1, mt: 0.5, color: 'secondary.main' }}>•</Box>
                    <Typography>Shop & Product Pages</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box component="span" sx={{ mr: 1, mt: 0.5, color: 'secondary.main' }}>•</Box>
                    <Typography>Cart & Checkout</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box component="span" sx={{ mr: 1, mt: 0.5, color: 'secondary.main' }}>•</Box>
                    <Typography>Category Pages</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box component="span" sx={{ mr: 1, mt: 0.5, color: 'secondary.main' }}>•</Box>
                    <Typography>User Accounts</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box component="span" sx={{ mr: 1, mt: 0.5, color: 'secondary.main' }}>•</Box>
                    <Typography>Wishlist Feature</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box component="span" sx={{ mr: 1, mt: 0.5, color: 'secondary.main' }}>•</Box>
                    <Typography>Order Management</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Typography variant="body2" sx={{ mt: 2, opacity: 0.9 }}>
                Additional 5 days for e-commerce integration
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const CallToAction = () => {
  return (
    <Box sx={{ py: 10, textAlign: 'center' }}>
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
          color="text.secondary"
          sx={{ 
            maxWidth: 700,
            mx: 'auto',
            mb: 4
          }}
        >
          Let's discuss your project and find the perfect solution for your business needs.
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
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

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <HostingPlans />
      <WebsitePackage />
      <CallToAction />
    </>
  );
};

export default Home;