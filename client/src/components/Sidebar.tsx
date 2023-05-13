import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  SettingsOutlined,
  ChevronRightOutlined,
} from '@mui/icons-material';
import {
  Box,
  List,
  Theme,
  Drawer,
  Divider,
  useTheme,
  ListItem,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import FlexBetween from './style/FlexBetween';
import NavbarItem from '../models/NavbarItem';
import ProfileImage from '../assets/profile.jpg';
import NAVBARITEMS from '../constants/NavbarItems';
import { ColorPartial } from '@mui/material/styles/createPalette';

interface SidebarProps {
  user: any;
  drawerWidth: string;
  isNonMobile: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({
  user,
  drawerWidth,
  isNonMobile,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();
  const theme = useTheme<Theme>();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component='nav'>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: (theme.palette.secondary as ColorPartial)[200],
              bgcolor: theme.palette.background.paper,
              boxSizing: 'border-box',
              width: drawerWidth,
              borderWidth: isNonMobile ? 0 : '2px',
            },
          }}
        >
          <Box width='100%'>
            <Box m='1.5rem 2rem 2rem 3rem'>
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display='flex' alignItems='center' gap='0.5rem'>
                  <Typography variant='h4' fontWeight='bold'>
                    ECOMVISION
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            {/* NAVITEMS */}
            <List>
              {NAVBARITEMS.map((navItem: NavbarItem) => {
                const { text, icon, isNavHeader } = navItem;

                if (isNavHeader && !icon) {
                  return (
                    <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                      {text}
                    </Typography>
                  );
                }

                const lcText = text.toLocaleLowerCase();
                const isActive = active === lcText;

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        bgcolor: isActive
                          ? (theme.palette.secondary as any)[300]
                          : 'transparent',
                        color: isActive
                          ? (theme.palette.primary as any)[600]
                          : (theme.palette.secondary as any)[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '2rem',
                          color: isActive
                            ? (theme.palette.primary as any)[600]
                            : (theme.palette.secondary as any)[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {isActive && <ChevronRightOutlined sx={{ ml: 'auto' }} />}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* <Box position='absolute' bottom='2rem'> */}
          <Box sx={{ mb: '2rem' }}>
            <Divider />
            <FlexBetween textTransform='none' gap='1rem' m='1.5rem 2rem 0 3rem'>
              <Box
                component='img'
                width='40px'
                height='40px'
                alt='profile'
                borderRadius='50%'
                src={ProfileImage}
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign='left'>
                <Typography
                  fontWeight='bold'
                  fontSize='0.9rem'
                  sx={{ color: (theme.palette.secondary as any)[100] }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  fontSize='0.8rem'
                  sx={{ color: (theme.palette.secondary as any)[200] }}
                >
                  {user?.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: (theme.palette.secondary as any)[300],
                  fontSize: '25px',
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
