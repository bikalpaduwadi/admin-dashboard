import { FC, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';

import PageHeader from '../components/PageHeader';
import Transaction from '../models/entity/Transaction';
import { useGetTransactionsQuery } from '../state/apis/clients';
import CustomToolbar from '../components/datagrid/CustomToolbar';

interface TransactionsProps {}

const Transactions: FC<TransactionsProps> = ({}) => {
  const theme = useTheme();

  const [searchInput, setSearchInput] = useState('');

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });

  const [sortModel, setsortModel] = useState<GridSortModel>([]);

  const [search, setSearch] = useState('');

  const { data, isLoading } = useGetTransactionsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sortModel[0]),
    search,
  });

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
      flex: 0.4,
      sortable: false,
      renderCell: (params) => params.value?.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ] as GridColDef<Transaction>[];

  return (
    <Box m='1.5rem 2.5rem'>
      <PageHeader title='TRANSACTIONS' subTitle='List of Transactions' />
      <Box
        height='80vh'
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
          rows={(data && data.transactions) || []}
          rowCount={(data && data.total) || 0}
          columns={columns}
          pagination={true}
          pageSizeOptions={[20, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode='server'
          sortingMode='server'
          sortModel={sortModel}
          onSortModelChange={setsortModel}
          slots={{
            toolbar: CustomToolbar,
          }}
          slotProps={{
            toolbar: {
              setSearch,
              searchInput,
              setSearchInput,
            },
          }}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default Transactions;
