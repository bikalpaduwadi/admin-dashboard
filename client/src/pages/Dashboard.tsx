import { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Email,
  Traffic,
  PersonAdd,
  PointOfSale,
  DownloadOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  useTheme,
  Typography,
  useMediaQuery,
} from '@mui/material';

import StatBox from '../components/StatBox';
import PageHeader from '../components/PageHeader';
import OverviewChart from '../components/OverviewChart';
import BreakdownChart from '../components/BreakdownChart';
import FlexBetween from '../components/style/FlexBetween';
import { useGetDashboardQuery } from '../state/apis/sales';

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');
  const { data, isLoading } = useGetDashboardQuery();

  console.log(data);

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User Id',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.6,
      sortable: false,
      renderCell: (params) => params.value?.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 0.7,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ] as GridColDef<any>[];

  return (
    <Box m='1.5rem 2.5rem'>
      <FlexBetween>
        <PageHeader title='DASHBOARD' subTitle='Welcome to your dashboard' />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.paper,
              fontSize: '14px',
              fontWeight: 'boald',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlined sx={{ mr: '10px' }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt='20px'
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='160px'
        gap='20px'
        sx={{
          '& > div': { gridColumn: isNonMediumScreens ? undefined : 'span 12' },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title='Total Customers'
          value={data && data.totalCustomers}
          increase='+14%'
          icon={
            <Email
              sx={{
                color: (theme.palette.secondary as any)[300],
                fontSize: '26px',
              }}
            />
          }
          description='Since last month'
        />

        <StatBox
          title='Sales Today'
          value={data && data.todayStats.totalSales}
          increase='+21%'
          icon={
            <PointOfSale
              sx={{
                color: (theme.palette.secondary as any)[300],
                fontSize: '26px',
              }}
            />
          }
          description='Since last month'
        />

        <Box
          gridColumn='span 8'
          gridRow='span 2'
          bgcolor={theme.palette.background.paper}
          p='1rem'
          borderRadius='0.55rem'
        >
          <OverviewChart view='sales' isDashboard={true} />
        </Box>

        <StatBox
          title='Monthly Sales'
          value={data && data.thisMonthStats.totalSales}
          increase='+5%'
          icon={
            <PersonAdd
              sx={{
                color: (theme.palette.secondary as any)[300],
                fontSize: '26px',
              }}
            />
          }
          description='Since last month'
        />

        <StatBox
          title='Yearly Sales'
          value={data && data.yearlySalesTotal}
          increase='+43%'
          icon={
            <Traffic
              sx={{
                color: (theme.palette.secondary as any)[300],
                fontSize: '26px',
              }}
            />
          }
          description='Since last month'
        />

        {/* ROW 2 */}
        <Box
          gridColumn='span 8'
          gridRow='span 3'
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              borderRadius: '5rem',
            },
            '& .MuiDataGrid': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.paper,
              color: (theme.palette.secondary as any)[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.background.paper,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.paper,
              color: (theme.palette.secondary as any)[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${(theme.palette.secondary as any)[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            rowCount={(data && data.total) || 0}
            columns={columns}
          ></DataGrid>
        </Box>
        <Box
          gridColumn='span 4'
          gridRow='span 3'
          bgcolor={theme.palette.background.paper}
          p='1.5rem'
          borderRadius='0.55rem'
        >
          <Typography
            variant='h6'
            sx={{ color: (theme.palette.secondary as any)[100] }}
          >
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p='0 0.6rem'
            fontSize='0.8rem'
            sx={{ color: (theme.palette.secondary as any)[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and toal sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
