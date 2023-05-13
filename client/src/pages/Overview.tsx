import { FC, useState } from 'react';
import { Box, FormControl, MenuItem, InputLabel, Select } from '@mui/material';

import PageHeader from '../components/PageHeader';
import OverviewChart from '../components/OverviewChart';

interface OverviewProps {}

const Overview: FC<OverviewProps> = ({}) => {
  const [view, setView] = useState<string>('units');

  return (
    <Box m='1.5rem 2.5rem'>
      <PageHeader
        title='OVERVIEW'
        subTitle='Overview of general revenue and profit'
      />
      <Box height='75vh'>
        <FormControl sx={{ mt: '1rem' }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label='view'
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value='sales'>Sales</MenuItem>
            <MenuItem value='units'>Units</MenuItem>
          </Select>
        </FormControl>

        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
