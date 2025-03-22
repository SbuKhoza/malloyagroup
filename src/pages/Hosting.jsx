import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import BackupIcon from '@mui/icons-material/Backup';
import SupportIcon from '@mui/icons-material/Support';

// Import components
import HostingPlans from '../components/HostingPlans';

const HostingFeatures = () => {
  const features = [
    {
      title: 'Lightning Fast Speed',
      description: 'Our NVMe SSD storage and LiteSpeed caching ensure your website loads blazingly fast.',
      icon: <SpeedIcon fontSize="large" />,
    },
    {
      title: 'Security Protection',
      description: 'Free SSL certificates and Imunify360 protection keep your website safe from threats.',
      icon: <SecurityIcon fontSize="large" />,
    },
    {
      title: 'Regular Backups',
      description: 'JetBackup provides weekly backups, ensuring your data is always protected.',
      icon: <BackupIcon fontSize="large" />,
    },
    {
      title: '24/7 Support',
      description: 'Our technical team is available around the clock to assist with any issues.',
      icon: <SupportIcon fontSize="large" />,
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
            Premium Hosting Features
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ 
              maxWidth: 800,
              mx: 'auto' 
            }}
          >
            Our web hosting is optimized for performance, security, and reliability
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box sx={{ 
                  color: 'primary.main', 
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const HostingFAQ = () => {
  const faqs = [
    {
      question: 'How do I transfer my existing website to MALLOYA GROUP hosting?',
      answer: 'We offer free migration services for all new customers. Our technical team will handle the entire process, ensuring a smooth transition with minimal downtime for your website.'
    },
    {
      question: 'What is the uptime guarantee for your hosting services?',
      answer: 'We provide a 99.9% uptime guarantee for all our hosting plans. In the rare event that we fail to meet this commitment, you may be eligible for account credits as detailed in our Service Level Agreement.'
    },
    {
      question: 'Can I upgrade my hosting plan later?',
      answer: 'Yes, you can upgrade your hosting plan at any time. The upgrade process is seamless and does not cause any downtime for your website. We\'ll simply prorate the difference in cost.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer 24/7 technical support via email, live chat, and ticketing system. Our knowledgeable support team is always ready to help with any hosting-related issues you may encounter.'
    },
    {
      question: 'Do you provide email hosting with your plans?',
      answer: 'Yes, all our hosting plans include email hosting with varying numbers of email accounts depending on the plan. Each email account includes webmail access, IMAP/POP3 support, and spam protection.'
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
            Frequently Asked Questions
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ 
              maxWidth: 800,
              mx: 'auto' 
            }}
          >
            Find answers to common questions about our hosting services
          </Typography>
        </Box>

        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion 
              key={index}
              elevation={0}
              sx={{ 
                mb: 2, 
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px !important',
                '&:before': {
                  display: 'none',
                },
                overflow: 'hidden'
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  backgroundColor: 'background.paper'
                }}
              >
                <Typography variant="h6" fontWeight="medium">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

const HostingCTA = () => {
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
          Ready to Get Started with Fast, Reliable Hosting?
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
          Get your website online in minutes with our easy setup and 24/7 support.
        </Typography>
        <Button 
          variant="contained" 
          color="secondary"
          size="large"
          href="#hosting-plans"
          sx={{ px: 5, py: 1.5 }}
        >
          Choose a Plan
        </Button>
      </Container>
    </Box>
  );
};

const Hosting = () => {
  return (
    <>
      <HostingCTA />
      <div id="hosting-plans">
        <HostingPlans />
      </div>
      <HostingFeatures />
      <HostingFAQ />
    </>
  );
};

export default Hosting;