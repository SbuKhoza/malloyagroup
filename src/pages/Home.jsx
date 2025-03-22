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
import heroImage from '../assets/hero.png';

// Import components
import ServiceCard from '../components/ServiceCard';
import HostingPlans from '../components/HostingPlans';

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box 
      sx={{ 
        backgroundColor: '#002244', // Changed to your navy blue
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
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  backgroundColor: '#F0F8FF', // Light blue
                  color: '#002244', // Navy blue text
                  '&:hover': {
                    backgroundColor: '#d7e9fa', // Slightly darker on hover
                  }
                }}
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
              src={heroImage}  // Use the imported image
              alt="Digital solutions"
              sx={{ 
                width: '100%',
                borderRadius: 2,
                // boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                // border: '4px solid rgba(240,248,255,0.2)' // Light blue border
              }}
            />
          </Grid>
        </Grid>
      </Container>
      {/* Add subtle pattern overlay */}
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
    <Box sx={{ py: 8, backgroundColor: '#F0F8FF' }}> {/* Light blue background */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: '#002244' // Navy text
            }}
          >
            Our Services
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ 
              maxWidth: 800,
              mx: 'auto',
              color: 'rgba(0,34,68,0.8)' // Semi-transparent navy
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
    <Box sx={{ 
      py: 8, 
      background: 'linear-gradient(135deg, #002244 0%, #001a33 100%)', // Gradient navy
      color: 'white' 
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
              Standard Website Package
            </Typography>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'medium', color: '#F0F8FF' }}>
              R3,500
            </Typography>
            <Typography variant="h6" gutterBottom>
              For a 4-page website with essential features
            </Typography>
            <Box sx={{ my: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box component="span" sx={{ mr: 1, color: '#F0F8FF' }}>✅</Box>
                    <Typography>Mobile-friendly design</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box component="span" sx={{ mr: 1, color: '#F0F8FF' }}>✅</Box>
                    <Typography>Basic UI customization</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box component="span" sx={{ mr: 1, color: '#F0F8FF' }}>✅</Box>
                    <Typography>Basic SEO setup</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box component="span" sx={{ mr: 1, color: '#F0F8FF' }}>✅</Box>
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
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ 
                px: 4, 
                py: 1.5, 
                backgroundColor: '#F0F8FF',
                color: '#002244',
                '&:hover': {
                  backgroundColor: '#d7e9fa',
                }
              }}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              backgroundColor: 'rgba(240,248,255,0.1)', 
              p: 4, 
              borderRadius: 2,
              border: '1px solid rgba(240,248,255,0.2)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                E-Commerce Add-On
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium', color: '#F0F8FF' }}>
                R6,000
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Transform your website into a fully-functional online store:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box component="span" sx={{ mr: 1, mt: 0.5, color: '#F0F8FF' }}>•</Box>
                    <Typography>Shop & Product Pages</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box component="span" sx={{ mr: 1, mt: 0.5, color: '#F0F8FF' }}>•</Box>
                    <Typography>Cart & Checkout</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box component="span" sx={{ mr: 1, mt: 0.5, color: '#F0F8FF' }}>•</Box>
                    <Typography>Category Pages</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box component="span" sx={{ mr: 1, mt: 0.5, color: '#F0F8FF' }}>•</Box>
                    <Typography>User Accounts</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box component="span" sx={{ mr: 1, mt: 0.5, color: '#F0F8FF' }}>•</Box>
                    <Typography>Wishlist Feature</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box component="span" sx={{ mr: 1, mt: 0.5, color: '#F0F8FF' }}>•</Box>
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

const CMSAddOn = () => {
  return (
    <Box sx={{ 
      py: 8, 
      backgroundColor: '#F0F8FF' // Light blue background
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                borderRadius: 2,
                p: 4,
                backgroundColor: 'white',
                boxShadow: '0 8px 24px rgba(0,34,68,0.1)',
                height: '100%'
              }}
            >
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: '#002244' // Navy text
                }}
              >
                CMS Add-On
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3, 
                  color: '#002244',
                  fontWeight: 'medium'
                }}
              >
                R3,000
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3, 
                  color: 'rgba(0,34,68,0.8)'
                }}
              >
                For businesses needing an easy way to update their website content without coding.
              </Typography>
              
              <Box sx={{ my: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box component="span" sx={{ mr: 1, color: '#002244' }}>✅</Box>
                      <Typography><strong>Admin Dashboard</strong> – Easily update text, images, and pages</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box component="span" sx={{ mr: 1, color: '#002244' }}>✅</Box>
                      <Typography><strong>SEO-friendly structure</strong> – Optimized for search engines</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box component="span" sx={{ mr: 1, color: '#002244' }}>✅</Box>
                      <Typography><strong>User roles & permissions</strong> – Control who can edit or manage content</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box component="span" sx={{ mr: 1, color: '#002244' }}>✅</Box>
                      <Typography><strong>Signup & Login Page</strong> – Allows users to create and manage accounts</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              
              <Box 
                sx={{ 
                  backgroundColor: 'rgba(0,34,68,0.05)', 
                  p: 2, 
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box component="span" sx={{ mr: 1, color: '#002244', fontWeight: 'bold' }}>📌</Box>
                <Typography variant="body2" sx={{ color: 'rgba(0,34,68,0.8)' }}>
                  <strong>Additional CMS-powered pages:</strong> R500 per page <br/> <strong> Up to 5 days for integration</strong>
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box>
              <Typography 
                variant="h4" 
                component="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: '#002244',  // Navy text
                  mb: 3
                }}
              >
                Why Choose Our CMS Solution?
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="body1" 
                  paragraph 
                  sx={{ color: 'rgba(0,34,68,0.8)' }}
                >
                  Our Content Management System empowers you to take control of your website without any technical knowledge.
                </Typography>
                
                <Typography 
                  variant="body1" 
                  paragraph 
                  sx={{ color: 'rgba(0,34,68,0.8)' }}
                >
                  With an intuitive admin dashboard, you can:
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2, p: 2, borderLeft: '3px solid #002244' }}>
                    <Typography variant="h6" sx={{ color: '#002244', mb: 1 }}>
                      Update Content Easily
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(0,34,68,0.7)' }}>
                      Change text, images, and add new pages without coding knowledge
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2, p: 2, borderLeft: '3px solid #002244' }}>
                    <Typography variant="h6" sx={{ color: '#002244', mb: 1 }}>
                      Manage Users
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(0,34,68,0.7)' }}>
                      Add team members with specific permissions and access levels
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2, p: 2, borderLeft: '3px solid #002244' }}>
                    <Typography variant="h6" sx={{ color: '#002244', mb: 1 }}>
                      Track Performance
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(0,34,68,0.7)' }}>
                      Built-in analytics to monitor visitor behavior and engagement
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2, p: 2, borderLeft: '3px solid #002244' }}>
                    <Typography variant="h6" sx={{ color: '#002244', mb: 1 }}>
                      Schedule Content
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(0,34,68,0.7)' }}>
                      Plan and schedule content updates for future publication
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 4 }}>
                {/* <Button 
                  variant="contained" 
                  size="large"
                  component={RouterLink}
                  to="/contact"
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    backgroundColor: '#002244',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#001a33',
                    }
                  }}
                >
                  Learn More
                </Button> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const CallToAction = () => {
  return (
    <Box sx={{ 
      py: 10, 
      textAlign: 'center',
      background: 'linear-gradient(to bottom, #F0F8FF, white)'
    }}>
      <Container maxWidth="md">
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 3,
            color: '#002244' // Navy text
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
            color: 'rgba(0,34,68,0.8)' // Semi-transparent navy
          }}
        >
          Let's discuss your project and find the perfect solution for your business needs.
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          component={RouterLink}
          to="/contact"
          sx={{ 
            px: 5, 
            py: 1.5, 
            backgroundColor: '#002244',
            color: 'white',
            '&:hover': {
              backgroundColor: '#001a33',
            }
          }}
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
      <CMSAddOn />
      <CallToAction />
    </>
  );
};

export default Home;