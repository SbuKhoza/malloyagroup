import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  useMediaQuery,
  useTheme,
  Button,
  Paper
} from '@mui/material';

const PricingCard = ({ plan, isPopular }) => {
  return (
    <Paper
      elevation={0}
      sx={{ 
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: isPopular ? 'secondary.main' : 'divider',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }
      }}
    >
      {isPopular && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: -35,
            transform: 'rotate(45deg)',
            backgroundColor: 'secondary.main',
            color: '#002244',
            py: 0.5,
            px: 4,
            fontWeight: 'bold',
            fontSize: 14,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          POPULAR
        </Box>
      )}
      <Box 
        sx={{ 
          p: 3, 
          backgroundColor: isPopular ? 'rgba(240,248,255,0.2)' : 'background.paper',
          borderBottom: '1px solid',
          borderColor: isPopular ? 'secondary.main' : 'divider',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
          {plan.title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
          <Typography component="span" variant="h3" fontWeight="bold">
            R{plan.price}
          </Typography>
          <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 1 }}>
            /mo
          </Typography>
        </Box>
        <Button 
          variant={isPopular ? "contained" : "outlined"} 
          color={isPopular ? "secondary" : "primary"}
          fullWidth
          sx={{ 
            py: 1.2,
            ...(isPopular && {
              backgroundColor: '#F0F8FF',
              color: '#002244',
              '&:hover': {
                backgroundColor: '#d7e9fa',
              }
            })
          }}
        >
          Choose Plan
        </Button>
      </Box>
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 'medium' }}>
            FEATURES
          </Typography>
        </Box>
        {plan.features.map((feature, idx) => (
          <Box 
            key={idx} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1.5,
              color: isPopular && idx < 5 ? 'text.primary' : 'text.secondary',
              fontWeight: isPopular && idx < 5 ? 'medium' : 'regular'
            }}
          >
            <Box component="span" sx={{ mr: 1, color: isPopular ? 'secondary.main' : 'primary.main', fontSize: 18 }}>✓</Box>
            <Typography variant="body2">{feature}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

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
    <Box sx={{ 
      py: 8, 
      backgroundColor: '#F0F8FF',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle pattern overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(rgba(0,34,68,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none'
        }}
      />
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
            Hosting Plans
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ 
              maxWidth: 800,
              mx: 'auto',
              mb: 2,
              color: 'rgba(0,34,68,0.8)' // Semi-transparent navy
            }}
          >
            Fast, secure, and reliable web hosting for your business
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              color: 'rgba(0,34,68,0.7)',
              fontWeight: 'medium'
            }}
          >
            All plans include 99.9% uptime guarantee.
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {hostingPlans.map((plan, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={3} 
              key={index}
              sx={{
                display: 'flex'
              }}
            >
              <PricingCard 
                plan={plan} 
                isPopular={plan.popular} 
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 3 }}
          >
            Need a custom hosting solution? Contact our team for personalized options.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            sx={{ 
              px: 4, 
              py: 1.2, 
              backgroundColor: '#002244',
              '&:hover': {
                backgroundColor: '#001a33',
              }
            }}
          >
            Contact Sales
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HostingPlans;