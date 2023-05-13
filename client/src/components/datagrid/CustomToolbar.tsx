import React, { FC } from 'react';
import { Search } from '@mui/icons-material';
import { IconButton, TextField, InputAdornment } from '@mui/material';

import {
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import FlexBetween from '../style/FlexBetween';

interface CustomToolbarProps {
  searchInput: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const CustomToolbar: FC<CustomToolbarProps> = ({
  setSearch,
  searchInput,
  setSearchInput,
}) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width='100%'>
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label='Search...'
          sx={{ mb: '0.5rem', width: '15rem' }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant='standard'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput('');
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
