import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  useMediaQuery,
  useTheme
} from '@mui/material';
import PricingCard from './PricingCard';

const HostingPlans = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const hostingPlans = [
    {
      title: 'Starter Plan',
      price: 55,
      features: [
        'cPanel Access',
        '1 GB NVMe SSD Storage',
        'Unlimited Bandwidth',
        '2 Websites',
        '2 Databases',
        '5 Email Accounts',
        'Free SSL Certificate',
        'LiteSpeed Caching',
        'Weekly Backups'
      ],
      popular: false
    },
    {
      title: 'Standard Plan',
      price: 100,
      features: [
        'cPanel Access',
        '5 GB NVMe SSD Storage',
        'Unlimited Bandwidth',
        'Up to 4 Websites',
        '4 Databases',
        '10 Email Accounts',
        'Free SSL Certificate',
        'LiteSpeed Caching',
        'Imunify360 Protection'
      ],
      popular: true
    },
    {
      title: 'Business Plan',
      price: 150,
      features: [
        'cPanel Access',
        '10 GB NVMe SSD Storage',
        'Unlimited Bandwidth',
        'Up to 10 Websites',
        '10 Databases',
        '20 Email Accounts',
        'Free SSL Certificate',
        'LiteSpeed Caching',
        'Priority Support'
      ],
      popular: false
    },
    {
      title: 'Pro Plan',
      price: 200,
      features: [
        'cPanel Access',
        '20 GB NVMe SSD Storage',
        'Unlimited Bandwidth',
        'Unlimited Websites',
        'Unlimited Databases',
        '30 Email Accounts',
        'Free SSL Certificate',
        'LiteSpeed Caching',
        'Private Nameservers'
      ],
      popular: false
    }
  ];

  return (
    <Box sx={{ 
      py: 10, 
      background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9ff 100%)',
      position: 'relative'
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: '#4361ee', 
              fontWeight: 700, 
              letterSpacing: 2,
              mb: 1,
              display: 'block'
            }}
          >
            HOSTING PACKAGES
          </Typography>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 800,
              mb: 2,
              color: '#0f172a',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Reliable Hosting for Every Need
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: 700,
              mx: 'auto',
              color: '#64748b',
              fontWeight: 400,
              lineHeight: 1.6
            }}
          >
            Secure, fast, and scalable hosting solutions with 99.9% uptime guarantee and 24/7 local support.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {hostingPlans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <PricingCard 
                title={plan.title}
                price={plan.price}
                features={plan.features}
                popular={plan.popular}
                buttonText={plan.popular ? "Get Started" : "Choose Plan"}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HostingPlans;