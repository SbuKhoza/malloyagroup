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
      price: 49,
      features: [
        'cPanel Access',
        '1 GB NVMe SSD Storage',
        'Unlimited Bandwidth',
        '2 Websites',
        '2 Databases',
        '5 Email Accounts',
        'Free SSL Certificate',
        'LiteSpeed Caching',
        'Softaculous (400+ Apps)',
        'JetBackup Weekly Backups'
      ],
      popular: false
    },
    {
      title: 'Standard Plan',
      price: 99,
      features: [
        'cPanel Access',
        '5 GB NVMe SSD Storage',
        'Unlimited Bandwidth',
        'Up to 4 Websites',
        '4 Databases',
        '10 Email Accounts',
        'Free SSL Certificate',
        'LiteSpeed Caching',
        'Softaculous (400+ Apps)',
        'JetBackup Weekly Backups',
        'Imunify360 Protection'
      ],
      popular: true
    },
    {
      title: 'Business Plan',
      price: 149,
      features: [
        'cPanel Access',
        '10 GB NVMe SSD Storage',
        'Unlimited Bandwidth',
        'Up to 10 Websites',
        '10 Databases',
        '20 Email Accounts',
        'Free SSL Certificate',
        'LiteSpeed Caching',
        'Softaculous (400+ Apps)',
        'JetBackup Weekly Backups',
        'Imunify360 Protection',
        'Premium Site Builder'
      ],
      popular: false
    },
    {
      title: 'Pro Plan',
      price: 199,
      features: [
        'cPanel Access',
        '20 GB NVMe SSD Storage',
        'Unlimited Bandwidth',
        'Unlimited Websites',
        '20 Databases',
        '30 Email Accounts',
        'Free SSL Certificate',
        'LiteSpeed Caching',
        'Softaculous (400+ Apps)',
        'JetBackup Weekly Backups',
        'Imunify360 Protection',
        'Premium Site Builder',
        'Private Nameservers'
      ],
      popular: false
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
            Hosting Plans
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ 
              maxWidth: 800,
              mx: 'auto',
              mb: 1
            }}
          >
            Fast, secure, and reliable web hosting for your business
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              maxWidth: 700,
              mx: 'auto' 
            }}
          >
            All plans include 99.9% uptime guarantee, 24/7 support, and a 30-day money-back guarantee.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {hostingPlans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <PricingCard 
                title={plan.title}
                price={plan.price}
                features={plan.features}
                buttonText="Choose Plan"
                popular={plan.popular}
                onClick={() => console.log(`Selected ${plan.title}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HostingPlans;