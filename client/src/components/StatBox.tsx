import { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

import FlexBetween from './style/FlexBetween';

interface StatBoxProps {
  title: string;
  value: string;
  increase: string;
  icon: JSX.Element;
  description: string;
}

const StatBox: FC<StatBoxProps> = ({
  icon,
  title,
  value,
  increase,
  description,
}) => {
  const theme = useTheme();

  return (
    <Box
      gridColumn='span 2'
      gridRow='span 1'
      display='flex'
      flex='1 1 100%'
      p='1.25rem 1rem'
      flexDirection='column'
      justifyContent='space-between'
      bgcolor={theme.palette.background.paper}
      borderRadius='0.55rem'
    >
      <FlexBetween>
        <Typography
          variant='h6'
          sx={{ color: (theme.palette.secondary as any)[100] }}
        >
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant='h3'
        fontWeight='600'
        sx={{ color: (theme.palette.secondary as any)[200] }}
      >
        {value}
      </Typography>
      <FlexBetween gap='1rem'>
        <Typography
          variant='h5'
          fontStyle='italic'
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
