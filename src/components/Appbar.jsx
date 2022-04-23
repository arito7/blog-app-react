/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { MenuRounded } from '@mui/icons-material';
import {
  AppBar,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Appbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const links = [{ path: '/', label: 'Home' }];
  const authLinks = [
    { path: '/profile', label: 'My Page' },
    { path: '/newpost', label: 'New Post' },
  ];
  const unauthLinks = [
    { path: '/login', label: 'Login' },
    { path: '/signup', label: 'Sign up' },
  ];

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleCloseMenu();
  };

  const handleOpenMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElNav(null);
  };

  const MyMenuItem = ({ link }) => {
    return (
      <MenuItem
        key={link.label}
        onClick={() => {
          handleMenuItemClick(link.path);
        }}
      >
        <Typography>{link.label}</Typography>
      </MenuItem>
    );
  };

  const AppbarButton = ({ link }) => {
    return (
      <Button
        key={link.label}
        color="inherit"
        onClick={() => {
          navigate(link.path);
        }}
      >
        {link.label}
      </Button>
    );
  };
  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
              >
                <MenuRounded />
              </IconButton>
              <Menu
                id="menu"
                anchorEl={anchorElNav}
                keepMounted
                open={anchorElNav}
                onClose={handleCloseMenu}
              >
                {links.map((link) => (
                  <MyMenuItem link={link} />
                ))}
                {auth.user
                  ? authLinks.map((link) => <MyMenuItem link={link} />)
                  : unauthLinks.map((link) => <MyMenuItem link={link} />)}
              </Menu>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => {
                navigate('/');
              }}
              sx={{ cursor: 'pointer', display: 'flex', flexGrow: 1 }}
            >
              BlogApp
            </Typography>
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                justifyItems: 'space-between',
              }}
            >
              {links.map((link) => (
                <AppbarButton link={link} />
              ))}
              {auth.user
                ? authLinks.map((link) => <AppbarButton link={link} />)
                : unauthLinks.map((link) => <AppbarButton link={link} />)}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Appbar;
