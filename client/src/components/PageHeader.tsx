import { FC } from 'react';
import { Typography, Box, useTheme } from '@mui/material';

import { themeSettings } from '../theme';

interface PageHeaderProps {
  title: string;
  subTitle: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subTitle }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant='h3'
        color={(theme.palette.secondary as any)[100]}
        fontWeight='bold'
        sx={{ mb: '5px' }}
      >
        {title}
      </Typography>
      <Typography variant='h5' color={(theme.palette.secondary as any)[300]}>
        {subTitle}
      </Typography>
    </Box>
  );
};

export default PageHeader;
