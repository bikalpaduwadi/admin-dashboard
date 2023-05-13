export interface MonthlyData {
  month: string;
  totalSales: number;
  totalUnits: number;
}

export interface DailyData {
  date: string;
  totalSales: number;
  totalUnits: number;
}

export interface ProductStat {
  _id: string;
  year: number;
  createdAt: string;
  updatedAt: string;
  dailyData: DailyData[];
  yearlySalesTotal: number;
  monthlyData: MonthlyData[];
  yearlyTotalSoldUnits: number;
}

export default interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  supply: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  stat: ProductStat;
  description: string;
}
