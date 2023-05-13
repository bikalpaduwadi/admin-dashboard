import { useDispatch } from 'react-redux';
import React, { FC, useState } from 'react';
import {
  Search,
  DarkModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
  LightModeOutlined,
  ArrowDropDownOutlined,
} from '@mui/icons-material';

import FlexBetween from './style/FlexBetween';
import ProfileImage from '../assets/profile.jpg';
import { setMode } from '../state/reducers/themeSlice';
import {
  Box,
  Menu,
  Theme,
  AppBar,
  Button,
  Toolbar,
  MenuItem,
  useTheme,
  InputBase,
  IconButton,
  Typography,
} from '@mui/material';

interface NavbarProps {
  user: any;
  setIsSidebarOpen: (value: React.SetStateAction<boolean>) => void;
}

const Navbar: FC<NavbarProps> = ({ user, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme<Theme>();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* TOOLBAR LEFT */}
        <FlexBetween>
          <IconButton
            sx={{ marginRight: '10px' }}
            onClick={() => setIsSidebarOpen((value) => !value)}
          >
            <MenuIcon />
          </IconButton>
          <FlexBetween
            bgcolor={theme.palette.background.paper}
            borderRadius='9px'
            gap='3rem'
            p='0.1rem 1.5rem'
          >
            <InputBase placeholder='Search...' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* TOOLBAR RIGHT */}
        <FlexBetween gap='1.5rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'none',
                gap: '1rem',
              }}
            >
              <Box
                component='img'
                width='32px'
                height='32px'
                alt='profile'
                borderRadius='50%'
                src={ProfileImage}
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign='left'>
                <Typography
                  fontWeight='bold'
                  fontSize='0.85rem'
                  sx={{ color: (theme.palette.secondary as any)[100] }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  fontSize='0.75rem'
                  sx={{ color: (theme.palette.secondary as any)[200] }}
                >
                  {user?.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: (theme.palette.secondary as any)[300],
                  fontSize: '25px',
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
