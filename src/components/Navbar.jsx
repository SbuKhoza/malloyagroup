import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  ListItemButton
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Hosting', path: '/hosting' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const drawer = (
    <Box
      sx={{ 
        width: '100%',
        maxWidth: 300,
        height: '100%',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column'
      }}
      role="presentation"
    >
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 800, color: '#3a0ca3' }}>
          MALLOYA GROUP
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ px: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              component={RouterLink} 
              to={item.path}
              onClick={toggleDrawer(false)}
              sx={{ 
                borderRadius: 2,
                bgcolor: isActive(item.path) ? 'rgba(67, 97, 238, 0.1)' : 'transparent',
                color: isActive(item.path) ? '#4361ee' : 'text.primary',
              }}
            >
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ fontWeight: isActive(item.path) ? 700 : 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 3, mt: 'auto' }}>
        <Button
          fullWidth
          variant="contained"
          component={RouterLink}
          to="/quote"
          onClick={toggleDrawer(false)}
          sx={{ 
            py: 1.5,
            background: 'linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)',
            boxShadow: '0 4px 14px rgba(67, 97, 238, 0.4)',
            fontWeight: 700
          }}
        >
          Get a Quote
        </Button>
      </Box>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={scrolled ? 4 : 0}
      sx={{ 
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'white',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'transparent' : 'rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 70, justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 900,
              background: 'linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              letterSpacing: '-0.5px',
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            MALLOYA GROUP
          </Typography>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  sx={{ 
                    px: 2,
                    fontWeight: 600,
                    color: isActive(item.path) ? '#4361ee' : '#64748b',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#4361ee'
                    },
                    '&::after': isActive(item.path) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 6,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#4361ee'
                    } : {}
                  }}
                >
                  {item.name}
                </Button>
              ))}
              <Button
                variant="contained"
                component={RouterLink}
                to="/quote"
                sx={{ 
                  ml: 2,
                  px: 3,
                  py: 1,
                  background: 'linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)',
                  color: 'white',
                  fontWeight: 700,
                  borderRadius: '50px',
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(67, 97, 238, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2e0a82 0%, #3b53d4 100%)',
                    boxShadow: '0 6px 20px rgba(67, 97, 238, 0.4)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Get a Quote
              </Button>
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              edge="end"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ color: '#3a0ca3' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;