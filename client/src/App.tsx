import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Daily from './pages/Daily';
import Admin from './pages/Admin';
import Monthly from './pages/Monthly';
import { themeSettings } from './theme';
import Products from './pages/Products';
import Overview from './pages/Overview';
import Layout from './components/Layout';
import Customers from './pages/Customers';
import { RootState } from './state/store';
import Dashboard from './pages/Dashboard';
import Geography from './pages/Geography';
import Breakdown from './pages/Breakdown';
import Performance from './pages/Performance';
import Transactions from './pages/Transactions';

import './App.css';

function App() {
  const mode: PaletteMode = useSelector(
    (state: RootState) => state.theme.mode as PaletteMode
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='App'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Navigate to='/dashboard' replace />} />
              <Route path='/daily' element={<Daily />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/monthly' element={<Monthly />} />
              <Route path='/products' element={<Products />} />
              <Route path='/overview' element={<Overview />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/breakdown' element={<Breakdown />} />
              <Route path='/geography' element={<Geography />} />
              <Route path='/customers' element={<Customers />} />
              <Route path='/performance' element={<Performance />} />
              <Route path='/transactions' element={<Transactions />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
