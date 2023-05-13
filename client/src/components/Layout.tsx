import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, useMediaQuery } from '@mui/material';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { RootState } from '../state/store';
import { useGetUserQuery } from '../state/apis/users';

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({}) => {
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const userId = useSelector((state: RootState) => state.session.userId);

  const { data, isFetching, error } = useGetUserQuery(userId);

  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width='100%' height='100%'>
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        drawerWidth='250px'
      />
      <Box flexGrow={1}>
        <Navbar user={data || {}} setIsSidebarOpen={setIsSidebarOpen} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
