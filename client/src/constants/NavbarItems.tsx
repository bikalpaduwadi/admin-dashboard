import {
  HomeOutlined,
  TodayOutlined,
  PublicOutlined,
  PieChartOutline,
  Groups3Outlined,
  TrendingUpOutlined,
  PointOfSaleOutlined,
  ReceiptLongOutlined,
  ShoppingCartOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
} from '@mui/icons-material';

import NavbarItem from '../models/NavbarItem';

const NAVBARITEMS: NavbarItem[] = [
  {
    text: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    text: 'Client Facing',
    icon: null,
    isNavHeader: true,
  },
  {
    text: 'Products',
    icon: <ShoppingCartOutlined />,
  },
  {
    text: 'Customers',
    icon: <Groups3Outlined />,
  },
  {
    text: 'Transactions',
    icon: <ReceiptLongOutlined />,
  },
  {
    text: 'Geography',
    icon: <PublicOutlined />,
  },
  {
    text: 'Sales',
    icon: null,
    isNavHeader: true,
  },
  {
    text: 'Overview',
    icon: <PointOfSaleOutlined />,
  },
  {
    text: 'Daily',
    icon: <TodayOutlined />,
  },
  {
    text: 'Monthly',
    icon: <CalendarMonthOutlined />,
  },
  {
    text: 'Breakdown',
    icon: <PieChartOutline />,
  },
  {
    icon: null,
    isNavHeader: true,
    text: 'Management',
  },
  {
    text: 'Admin',
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: 'Performance',
    icon: <TrendingUpOutlined />,
  },
];

export default NAVBARITEMS;
