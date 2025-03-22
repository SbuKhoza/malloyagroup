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
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ContactHero = () => {
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
          Contact Us
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
          Get in touch with our team for inquiries, quotes, or support
        </Typography>
      </Container>
    </Box>
  );
};

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <LocationOnIcon fontSize="large" />,
      title: "Our Office",
      details: [
        "123 Business Street",
        "Cape Town",
        "South Africa"
      ]
    },
    {
      icon: <PhoneIcon fontSize="large" />,
      title: "Phone",
      details: [
        "+27 12 345 6789",
        "+27 98 765 4321"
      ]
    },
    {
      icon: <EmailIcon fontSize="large" />,
      title: "Email",
      details: [
        "info@malloyagroup.co.za",
        "support@malloyagroup.co.za"
      ]
    },
    {
      icon: <AccessTimeIcon fontSize="large" />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 8AM - 5PM",
        "Saturday: 9AM - 1PM",
        "Sunday: Closed"
      ]
    }
  ];

  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
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
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box 
                  sx={{ 
                    color: 'primary.main', 
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    opacity: 0.8
                  }}
                >
                  {detail.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {detail.title}
                </Typography>
                <Box>
                  {detail.details.map((item, idx) => (
                    <Typography key={idx} variant="body1" color="text.secondary" paragraph={idx === detail.details.length - 1}>
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
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        service: '',
        message: ''
      });
      
      // Show success message
      setSubmitted(true);
    }
  };

  const handleSnackbarClose = () => {
    setSubmitted(false);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Typography 
          variant="h3" 
          component="h2" 
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 4 }}
        >
          Send Us a Message
        </Typography>
        
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, md: 5 },
            borderRadius: 2
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
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
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
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  multiline
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    mt: 2,
                    fontWeight: 600
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        
        <Snackbar 
          open={submitted} 
          autoHideDuration={6000} 
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Your message has been sent successfully! We'll get back to you soon.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

const MapSection = () => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {/* In a real application, you would integrate Google Maps or another map service here */}
      <Box 
        sx={{ 
          height: '100%', 
          width: '100%', 
          backgroundColor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Map Loading... (Google Maps would be integrated here)
        </Typography>
      </Box>
    </Box>
  );
};

const Contact = () => {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <MapSection />
    </>
  );
};

export default Contact;