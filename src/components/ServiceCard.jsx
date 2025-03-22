import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  CardActions,
  Button,
  CardMedia,
  alpha,
  useTheme
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
  backgroundColor = 'background.paper',
  color = 'primary.main'
}) => {
  const theme = useTheme();
  
  // Safely access theme colors using proper MUI paths
  const resolveColor = (colorPath) => {
    if (colorPath === 'background.paper') {
      return theme.palette.background.paper;
    }
    if (colorPath === 'primary.main') {
      return theme.palette.primary.main;
    }
    if (colorPath === 'text.primary') {
      return theme.palette.text.primary;
    }
    if (colorPath === 'text.secondary') {
      return theme.palette.text.secondary;
    }
    // Return the color as is if it's not a theme path (could be a direct hex code)
    return colorPath;
  };

  const isCustomBg = backgroundColor !== 'background.paper';
  const bgColorValue = resolveColor(backgroundColor);
  const textColorValue = resolveColor(color);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
        },
        backgroundColor: bgColorValue,
        color: isCustomBg ? 'white' : theme.palette.text.primary,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          height={160}
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
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: isCustomBg 
                ? 'rgba(255, 255, 255, 0.2)' 
                : alpha(textColorValue, 0.1),
              color: isCustomBg ? 'white' : textColorValue,
            }}
          >
            <Icon fontSize="large" />
          </Box>
        )}
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          fontWeight="bold"
          color={isCustomBg ? 'white' : textColorValue}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body1" 
          color={isCustomBg 
            ? 'rgba(255, 255, 255, 0.8)' 
            : theme.palette.text.secondary}
        >
          {description}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button 
          component={RouterLink}
          to={link}
          size="small" 
          color={isCustomBg ? 'inherit' : 'primary'}
          endIcon={<ArrowForwardIcon />}
          sx={{ 
            fontWeight: 'medium',
            color: isCustomBg ? 'white' : textColorValue,
            '&:hover': {
              backgroundColor: isCustomBg 
                ? 'rgba(255, 255, 255, 0.1)' 
                : alpha(textColorValue, 0.1)
            }
          }}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;