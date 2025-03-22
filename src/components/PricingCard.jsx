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
  Chip
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
    <Card 
      raised={popular}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
        },
        border: popular ? 2 : 0,
        borderColor: popular ? 'primary.main' : 'transparent',
      }}
    >
      {popular && (
        <Chip
          label="Popular"
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            fontWeight: 'bold',
          }}
        />
      )}
      
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" color={popular ? 'primary.main' : 'inherit'}>
          {title}
        </Typography>
        
        <Box sx={{ my: 3, display: 'flex', alignItems: 'baseline' }}>
          <Typography variant="h3" component="span" fontWeight="bold">
            {typeof price === 'string' ? price : `R${price}`}
          </Typography>
          {period && (
            <Typography variant="subtitle1" component="span" sx={{ ml: 1 }}>
              /{period}
            </Typography>
          )}
        </Box>
        
        <List disablePadding>
          {features.map((feature, index) => (
            <ListItem key={index} disableGutters disablePadding sx={{ pb: 1 }}>
              <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                <CheckCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={feature}
                primaryTypographyProps={{ 
                  variant: 'body2',
                  style: { fontWeight: 400 }
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
          color="primary"
          size="large"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PricingCard;