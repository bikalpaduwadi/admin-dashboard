import { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, useTheme } from '@mui/material';

import PageHeader from '../components/PageHeader';
import { useGetCustomersQuery } from '../state/apis/users';
import User from '../models/entity/User';

interface CustomersProps {}

const Customers: FC<CustomersProps> = ({}) => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();

  console.log('customers: ', data);

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 0.7,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3');
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.4,
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.5,
    },
  ] as GridColDef<User>[];

  return (
    <Box m='1.5rem 2.5rem'>
      <PageHeader title='CUSTOMERS' subTitle='List of Customers' />
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
          rows={data || []}
          columns={columns}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default Customers;
