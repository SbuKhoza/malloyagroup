import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  CardActions,
  Button,
  CardMedia,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  imageUrl, 
  buttonText = 'Learn More', 
  link = '#',
  variant = 'light' 
}) => {
  const isDark = variant === 'dark';
  const bgColor = isDark ? '#002244' : 'white';
  const textColor = isDark ? 'white' : '#0f172a';
  const descColor = isDark ? 'rgba(255, 255, 255, 0.7)' : '#64748b';
  
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{ height: '100%' }}
    >
      <Card
        elevation={0}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: bgColor,
          color: textColor,
          borderRadius: 4,
          border: isDark ? 'none' : '1px solid',
          borderColor: 'divider',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {imageUrl && (
          <Box sx={{ overflow: 'hidden', height: 180 }}>
             <CardMedia
              component="img"
              height="100%"
              image={imageUrl}
              alt={title}
              sx={{ 
                transition: 'transform 0.5s ease',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            />
          </Box>
        )}
        
        <CardContent sx={{ flexGrow: 1, p: 3.5 }}>
          {Icon && (
            <Box 
              sx={{ 
                mb: 2.5,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1.5,
                borderRadius: '12px',
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(67, 97, 238, 0.1)',
                color: isDark ? '#4cc9f0' : '#4361ee',
              }}
            >
              <Icon size={28} />
            </Box>
          )}
          
          <Typography 
            variant="h6" 
            component="h3" 
            gutterBottom 
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.5px',
              mb: 1.5
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{
              color: descColor,
              lineHeight: 1.6
            }}
          >
            {description}
          </Typography>
        </CardContent>
        
        <CardActions sx={{ p: 3.5, pt: 0 }}>
          <Button 
            component={RouterLink}
            to={link}
            endIcon={<ArrowForwardIcon sx={{ fontSize: '0.9rem' }} />}
            sx={{ 
              fontWeight: 600,
              textTransform: 'none',
              color: isDark ? '#4cc9f0' : '#4361ee',
              p: 0,
              '&:hover': {
                bgcolor: 'transparent',
                textDecoration: 'underline'
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

export default ServiceCard;