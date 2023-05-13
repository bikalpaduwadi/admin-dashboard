export interface TransactionQueryParam {
  page: number;
  sort: string;
  search: string;
  pageSize: number;
}

export default interface Transaction {
  _id: string;
  cost: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  products: string[];
}
