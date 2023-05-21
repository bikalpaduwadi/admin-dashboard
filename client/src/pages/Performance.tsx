import { useSelector } from 'react-redux';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { RootState } from '../state/store';
import PageHeader from '../components/PageHeader';
import { useGetUserPerformanceQuery } from '../state/apis/users';

const Performance = () => {
  const theme = useTheme();
  const userId = useSelector((state: RootState) => state.session.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  console.log(data);

  if (!data || isLoading) {
    return <>Loading...</>;
  }

  console.log(data);
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      flex: 1,
    },

    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ] as GridColDef<any>[];

  return (
    <Box m='1.5rem 2.5rem'>
      <PageHeader
        title='PERFORMANCE'
        subTitle='Track your affiliate sales performance'
      />
      <Box
        mt='25px'
        height='72vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
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
            backgroundColor: theme.palette.primary.light,
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
          rows={(data && data.sales) || []}
          columns={columns}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default Performance;
