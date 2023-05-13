import { DailyData, MonthlyData } from './Product';

export default interface SalesStat {
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  createdAt: string;
  updatedAt: string;
  dailyData: DailyData[];
  monthlyData: MonthlyData[];
  salesByCategory: Record<string, number>;
}
