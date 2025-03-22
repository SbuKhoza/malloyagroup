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
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

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
        backgroundColor: '#002244', 
        color: 'white',
        mb: 2
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
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
          to="/contact"
          sx={{ 
            py: 1.2,
            backgroundColor: '#002244',
            color: 'white',
            '&:hover': {
              backgroundColor: '#001a33',
            }
          }}
        >
          Get Started
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
              color: '#002244', // Navy blue from Home
              textDecoration: 'none',
              flexGrow: 1,
              letterSpacing: '-0.5px'
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
                  color: '#002244'
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
                to="/contact"
                sx={{ 
                  ml: 2,
                  px: 3,
                  py: 1,
                  backgroundColor: '#002244', // Navy blue from Home
                  color: 'white',
                  fontWeight: 500,
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#001a33', // Slightly darker on hover
                  }
                }}
              >
                Get Started
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;