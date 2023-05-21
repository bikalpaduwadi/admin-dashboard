import { FC } from 'react';
import { Box } from '@mui/material';

import PageHeader from '../components/PageHeader';
import BreakdownChart from '../components/BreakdownChart';

interface BreakdownProps {}

const Breakdown: FC<BreakdownProps> = ({}) => {
  return (
    <Box m='1.5rem 2.5rem'>
      <PageHeader title='BREAKDOWN' subTitle='Breakdown of Sales by Category' />
      <Box mt='40px' height='75vh'>
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
