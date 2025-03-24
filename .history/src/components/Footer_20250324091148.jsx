import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton,
  Divider,
  Stack,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: '#F0F8FF', // Light blue background matching drawer
        color: '#002244', // Navy blue text matching navbar
        py: { xs: 4, md: 6 },
        borderTop: '1px solid',
        borderColor: 'rgba(0,34,68,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#002244', 
                fontWeight: 700, 
                letterSpacing: '-0.5px',
                mb: 2
              }}
            >
              MALLOYA GROUP
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(0,34,68,0.85)', 
                mb: 2,
                maxWidth: '95%'
              }}
            >
              Your trusted partner for web development, mobile apps, and hosting solutions.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#002244',
                  '&:hover': { 
                    bgcolor: 'rgba(0,34,68,0.05)',
                    color: 'rgba(0,34,68,0.7)' 
                  }
                }}
                aria-label="facebook"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#002244',
                  '&:hover': { 
                    bgcolor: 'rgba(0,34,68,0.05)',
                    color: 'rgba(0,34,68,0.7)' 
                  }
                }}
                aria-label="twitter"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#002244',
                  '&:hover': { 
                    bgcolor: 'rgba(0,34,68,0.05)',
                    color: 'rgba(0,34,68,0.7)' 
                  }
                }}
                aria-label="instagram"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#002244',
                  '&:hover': { 
                    bgcolor: 'rgba(0,34,68,0.05)',
                    color: 'rgba(0,34,68,0.7)' 
                  }
                }}
                aria-label="linkedin"
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#002244', 
                fontWeight: 600,
                fontSize: '1rem',
                mb: 2
              }}
            >
              Services
            </Typography>
            {[
              { text: 'Website Development', path: '/services' },
              { text: 'Mobile App Development', path: '/services' },
              { text: 'Web Hosting', path: '/hosting' },
              { text: 'UI/UX Consultation', path: '/services' },
              { text: 'Testing Services', path: '/services' }
            ].map((item, index) => (
              <Link 
                key={index}
                component={RouterLink} 
                to={item.path} 
                sx={{ 
                  color: 'rgba(0,34,68,0.75)', 
                  display: 'block', 
                  mb: 1.5,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  '&:hover': {
                    color: '#002244',
                  }
                }}
              >
                {item.text}
              </Link>
            ))}
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#002244', 
                fontWeight: 600,
                fontSize: '1rem',
                mb: 2
              }}
            >
              Quick Links
            </Typography>
            {[
              { text: 'Home', path: '/' },
              { text: 'About Us', path: '/about' },
              { text: 'Contact', path: '/contact' },
              { text: 'Hosting Plans', path: '/hosting' },
              { text: 'Blog', path: '#' }
            ].map((item, index) => (
              <Link 
                key={index}
                component={RouterLink} 
                to={item.path} 
                sx={{ 
                  color: 'rgba(0,34,68,0.75)', 
                  display: 'block', 
                  mb: 1.5,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  '&:hover': {
                    color: '#002244',
                  }
                }}
              >
                {item.text}
              </Link>
            ))}
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#002244', 
                fontWeight: 600,
                fontSize: '1rem',
                mb: 2
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <LocationOnIcon sx={{ mr: 1.5, color: '#002244' }} fontSize="small" />
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(0,34,68,0.75)',
                  fontSize: '0.9rem'
                }}
              >
                Diepkloof 319-Iq,
                Soweto,
                Johannesburg,
                "South Africa
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <PhoneIcon sx={{ mr: 1.5, color: '#002244' }} fontSize="small" />
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(0,34,68,0.75)',
                  fontSize: '0.9rem'
                }}
              >
                +27 12 345 6789
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <EmailIcon sx={{ mr: 1.5, color: '#002244' }} fontSize="small" />
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(0,34,68,0.75)',
                  fontSize: '0.9rem'
                }}
              >
                info@malloyagroup.co.za
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              component={RouterLink}
              to="/contact"
              fullWidth
              sx={{ 
                mt: 2,
                py: 1,
                backgroundColor: '#002244',
                color: 'white',
                fontWeight: 500,
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#001a33',
                }
              }}
            >
              Get In Touch
            </Button>
          </Grid>
        </Grid>
        
        <Divider sx={{ 
          my: { xs: 3, md: 4 }, 
          borderColor: 'rgba(0,34,68,0.1)' 
        }} />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: { xs: 'center', sm: 'space-between' }, 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: { xs: 2, sm: 0 }
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(0,34,68,0.6)',
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            © {currentYear} MALLOYA GROUP. All rights reserved.
          </Typography>
          <Box sx={{ 
            display: 'flex',
            gap: { xs: 3, sm: 4 }
          }}>
            <Link 
              href="#" 
              sx={{ 
                color: 'rgba(0,34,68,0.6)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                '&:hover': {
                  color: '#002244',
                }
              }}
            >
              Privacy Policy
            </Link>
            <Link 
              href="#" 
              sx={{ 
                color: 'rgba(0,34,68,0.6)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                '&:hover': {
                  color: '#002244',
                }
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;