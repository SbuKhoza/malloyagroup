import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  CardActions,
  Button,
  CardMedia,
  alpha
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  imageUrl, 
  buttonText = 'Learn More', 
  link = '#',
  variant = 'light'  // 'light' or 'dark' variant options
}) => {
  // Using the same navy blue color from Navbar
  const primaryColor = '#002244';
  const lightBgColor = 'white';
  const darkBgColor = primaryColor;
  
  // Set colors based on variant
  const isDark = variant === 'dark';
  const bgColor = isDark ? darkBgColor : lightBgColor;
  const textColor = isDark ? 'white' : primaryColor;
  const secondaryTextColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0,34,68,0.7)';
  
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6
        },
        backgroundColor: bgColor,
        color: textColor,
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '4px',
        border: isDark ? 'none' : '1px solid rgba(0,34,68,0.1)'
      }}
      elevation={isDark ? 2 : 0}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          height={180}
          image={imageUrl}
          alt={title}
        />
      )}
      
      <CardContent sx={{ flexGrow: 1, p: 3, pt: imageUrl ? 2 : 3 }}>
        {Icon && (
          <Box 
            sx={{ 
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: isDark 
                ? 'rgba(255, 255, 255, 0.15)' 
                : 'rgba(0,34,68,0.05)',
              color: textColor,
            }}
          >
            <Icon fontSize="large" />
          </Box>
        )}
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{
            fontWeight: 700,
            color: textColor,
            letterSpacing: '-0.5px',
            mb: 1.5
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{
            color: secondaryTextColor
          }}
        >
          {description}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button 
          component={RouterLink}
          to={link}
          endIcon={<ArrowForwardIcon />}
          sx={{ 
            fontWeight: 500,
            color: textColor,
            '&:hover': {
              backgroundColor: isDark 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0,34,68,0.05)',
              color: isDark ? 'white' : 'rgba(0,34,68,0.8)'
            },
            py: 1,
            px: 0
          }}
        >
          {buttonText}
        </Button>
      </CardActions>
      
      {isDark && (
        <Button
          variant="contained"
          component={RouterLink}
          to={link}
          sx={{ 
            position: 'absolute',
            right: 0,
            top: 0,
            mt: 2,
            mr: 2,
            px: 2,
            py: 0.7,
            backgroundColor: '#001a33', 
            color: 'white',
            fontWeight: 500,
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.3)',
            }
          }}
        >
          {buttonText}
        </Button>
      )}
    </Card>
  );
};

export default ServiceCard;