import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ContactHero = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#002244', // Navy blue from Home component
        color: 'white',
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1"
          sx={{ 
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 2
          }}
        >
          Contact Us
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 400,
            mb: 2,
            opacity: 0.9,
            maxWidth: 700,
            mx: 'auto'
          }}
        >
          Get in touch with our team for inquiries, quotes, or support
        </Typography>
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

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: '#002244' }} />,
      title: "Our Office",
      details: [
        "Diepkloof 319-Iq",
        "Soweto",
        "Johannesburg",
        "South Africa"
      ]
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: '#002244' }} />,
      title: "Phone",
      details: [
        "+27 78 029 6288"
      ]
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: '#002244' }} />,
      title: "Email",
      details: [
        "info@malloyagroup.co.za",
        "support@malloyagroup.co.za"
      ]
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40, color: '#002244' }} />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 8AM - 5PM",
        "Saturday: Closed",
        "Sunday: Closed"
      ]
    }
  ];

  return (
    <Box sx={{ py: 6, backgroundColor: '#F0F8FF' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {contactDetails.map((detail, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 4
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {detail.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3"
                  sx={{ 
                    mb: 2, 
                    fontWeight: 600,
                    color: '#002244'
                  }}
                >
                  {detail.title}
                </Typography>
                <Box>
                  {detail.details.map((item, idx) => (
                    <Typography 
                      key={idx} 
                      variant="body1"
                      sx={{ 
                        mb: 0.5,
                        color: 'rgba(0,34,68,0.8)'
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const serviceOptions = [
    { value: 'business-consulting', label: 'Business Consulting' },
    { value: 'financial-advisory', label: 'Financial Advisory' },
    { value: 'strategic-planning', label: 'Strategic Planning' },
    { value: 'operations-management', label: 'Operations Management' },
    { value: 'market-research', label: 'Market Research' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous status
    setStatus({ submitting: false, success: false, error: null });
    
    if (validateForm()) {
      // Start submission process
      setStatus({ submitting: true, success: false, error: null });
      
      try {
        // Prepare email data
        const emailData = {
          to: 'info@malloyagroup.co.za',
          subject: `New Contact Form: ${formData.subject}`,
          body: `
            Name: ${formData.name}
            Email: ${formData.email}
            Phone: ${formData.phone || 'Not provided'}
            Service of Interest: ${formData.service || 'Not specified'}
            
            Message:
            ${formData.message}
          `
        };
        
        // Simulate email sending (replace with actual email service)
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to send email');
        }
        
        // Success handling
        setStatus({ submitting: false, success: true, error: null });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          service: '',
          message: ''
        });
      } catch (error) {
        // Error handling
        setStatus({ 
          submitting: false, 
          success: false, 
          error: 'Failed to send message. Please try again later.' 
        });
        console.error('Submission error:', error);
      }
    }
  };

  const handleCloseAlert = () => {
    setStatus(prev => ({ ...prev, success: false, error: null }));
  };

  return (
    <Box sx={{ py: 8, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: '#002244'
            }}
          >
            Send Us a Message
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: 700,
              mx: 'auto',
              color: 'rgba(0,34,68,0.8)'
            }}
          >
            We're eager to hear from you and help with your business needs
          </Typography>
        </Box>
        
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="service-label">Service of Interest</InputLabel>
                  <Select
                    labelId="service-label"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    label="Service of Interest"
                  >
                    {serviceOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Select the service you're interested in</FormHelperText>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={!!errors.subject}
                  helperText={errors.subject}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  required
                  multiline
                  rows={5}
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                <Button 
                  type="submit"
                  variant="contained" 
                  size="large"
                  disabled={status.submitting}
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
                  {status.submitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        
        {/* Success Alert */}
        <Snackbar 
          open={status.success} 
          autoHideDuration={6000} 
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseAlert} 
            severity="success" 
            sx={{ width: '100%' }}
          >
            Your message has been sent successfully! We'll get back to you soon.
          </Alert>
        </Snackbar>

        {/* Error Alert */}
        <Snackbar 
          open={!!status.error} 
          autoHideDuration={6000} 
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseAlert} 
            severity="error" 
            sx={{ width: '100%' }}
          >
            {status.error || 'An unexpected error occurred. Please try again.'}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

const MapSection = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: '#F0F8FF' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: '#002244'
            }}
          >
            Visit Our Office
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: 700,
              mx: 'auto',
              mb: 4,
              color: 'rgba(0,34,68,0.8)'
            }}
          >
            Soweto Empowerment Zone Bus Stop, Chris Hani Rd, Diepkloof 319-Iq, Soweto
          </Typography>
        </Box>
        
        <Paper 
          elevation={3}
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            height: 450
          }}
        >
          <Box sx={{ width: '100%', height: '100%' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.7029387691406!2d27.94785!3d-26.26058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9509b53ca28805%3A0x6b1aa022d59db371!2sSoweto%20Empowerment%20Zone%20Bus%20Stop%2C%20Chris%20Hani%20Rd!5e0!3m2!1sen!2sza!4v1711104523456!5m2!1sen!2sza" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </Box>
        </Paper>
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
          Schedule a Consultation
        </Button>
      </Container>
    </Box>
  );
};

const Contact = () => {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <MapSection />
      <ContactForm />
      <CallToAction />
    </>
  );
};

export default Contact;