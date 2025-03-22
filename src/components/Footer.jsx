import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton,
  Divider,
  Stack
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
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="primary" gutterBottom>
              MALLOYA GROUP
            </Typography>
            <Typography variant="body2" paragraph>
              Your trusted partner for web development, mobile apps, and hosting solutions.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="primary" aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="linkedin">
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Services
            </Typography>
            <Link component={RouterLink} to="/services" color="inherit" display="block" sx={{ mb: 1 }}>
              Website Development
            </Link>
            <Link component={RouterLink} to="/services" color="inherit" display="block" sx={{ mb: 1 }}>
              Mobile App Development
            </Link>
            <Link component={RouterLink} to="/hosting" color="inherit" display="block" sx={{ mb: 1 }}>
              Web Hosting
            </Link>
            <Link component={RouterLink} to="/services" color="inherit" display="block" sx={{ mb: 1 }}>
              UI/UX Consultation
            </Link>
            <Link component={RouterLink} to="/services" color="inherit" display="block" sx={{ mb: 1 }}>
              Testing Services
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact
            </Link>
            <Link component={RouterLink} to="/hosting" color="inherit" display="block" sx={{ mb: 1 }}>
              Hosting Plans
            </Link>
            <Link component="a" href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Blog
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">
                123 Business Street, Cape Town, South Africa
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">
                +27 12 345 6789
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">
                info@malloyagroup.co.za
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} MALLOYA GROUP. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Privacy Policy
              </Typography>
            </Link>
            <Link href="#" color="inherit">
              <Typography variant="body2" color="text.secondary">
                Terms of Service
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;