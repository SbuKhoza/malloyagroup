import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  CardActions,
  Chip,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';

const PricingCard = ({ 
  title, 
  price, 
  period = 'mo', 
  features, 
  buttonText = 'Select Plan', 
  popular = false,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{ height: '100%' }}
    >
      <Card 
        elevation={popular ? 8 : 0}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          border: popular ? 'none' : '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
          backgroundColor: popular ? 'white' : '#fafafa',
          overflow: 'visible'
        }}
      >
        {popular && (
          <Chip
            label="MOST POPULAR"
            sx={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: '#4361ee',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.75rem',
              height: 24,
              zIndex: 2
            }}
          />
        )}
        
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography 
            variant="h6" 
            component="h3" 
            align="center"
            sx={{ 
              fontWeight: 700, 
              color: popular ? '#4361ee' : 'text.secondary',
              mb: 2,
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              letterSpacing: 1
            }}
          >
            {title}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 3 }}>
            <Typography component="span" variant="h6" sx={{ verticalAlign: 'top', mr: 0.5 }}>R</Typography>
            <Typography variant="h3" component="span" fontWeight="800" sx={{ color: '#0f172a' }}>
              {price}
            </Typography>
            {period && (
              <Typography variant="subtitle1" component="span" sx={{ color: 'text.secondary', ml: 1 }}>
                /{period}
              </Typography>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />
          
          <List disablePadding>
            {features.map((feature, index) => (
              <ListItem key={index} disableGutters sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 36, color: popular ? '#4361ee' : '#10b981' }}>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={feature}
                  primaryTypographyProps={{ 
                    variant: 'body2',
                    color: 'text.primary',
                    fontWeight: 500
                  }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
        
        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button 
            fullWidth 
            variant={popular ? 'contained' : 'outlined'} 
            size="large"
            onClick={onClick}
            sx={{
              py: 1.5,
              fontWeight: 700,
              borderRadius: 2,
              textTransform: 'none',
              borderColor: popular ? 'transparent' : '#e2e8f0',
              bgcolor: popular ? '#4361ee' : 'transparent',
              color: popular ? 'white' : '#334155',
              boxShadow: popular ? '0 4px 14px 0 rgba(67, 97, 238, 0.39)' : 'none',
              '&:hover': {
                bgcolor: popular ? '#3a0ca3' : '#f1f5f9',
                borderColor: popular ? 'transparent' : '#cbd5e1',
                transform: 'translateY(-1px)'
              }
            }}
          >
            {buttonText}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default PricingCard;