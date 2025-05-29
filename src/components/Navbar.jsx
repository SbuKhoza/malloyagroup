import React, { useState } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery('(max-width:425px)');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Hosting', path: '/hosting' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const gradientStyle = {
    background: 'linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)',
  };

  const drawer = (
    <Box
      sx={{ 
        width: 250,
        backgroundColor: '#F0F8FF',
        height: '100%'
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ 
        p: 3, 
        ...gradientStyle, 
        color: 'white',
        mb: 2
      }}>
        <Typography variant="h6" component="div" sx={{ 
          fontWeight: 700,
          fontSize: isSmallMobile ? '0.8rem' : '1.25rem'
        }}>
          MALLOYA GROUP
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to={item.path}
              sx={{ 
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(0,34,68,0.05)'
                }
              }}
            >
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ 
                  fontWeight: 500,
                  color: '#002244'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, mt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          component={RouterLink}
          to="/quote"
          sx={{ 
            py: 1.2,
            ...gradientStyle,
            color: 'white',
            '&:hover': {
              opacity: 0.9,
            },
            boxShadow: '0 4px 10px rgba(67, 97, 238, 0.3)'
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
      elevation={0} 
      sx={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0,34,68,0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textDecoration: 'none',
              flexGrow: 1,
              letterSpacing: '-0.5px',
              fontSize: isSmallMobile ? '0.8rem' : (isMobile ? '1.25rem' : '1.5rem'), // Further reduced size for very small screens
            }}
          >
            MALLOYA GROUP
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ 
                  ml: 1,
                  color: '#3a0ca3'
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  sx={{ 
                    mx: 1.5, 
                    fontWeight: 500,
                    color: '#002244',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'rgba(0,34,68,0.7)'
                    }
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
                  ...gradientStyle,
                  color: 'white',
                  fontWeight: 500,
                  borderRadius: '4px',
                  '&:hover': {
                    opacity: 0.9,
                  },
                  boxShadow: '0 4px 10px rgba(67, 97, 238, 0.3)'
                }}
              >
                Get a Quote
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;