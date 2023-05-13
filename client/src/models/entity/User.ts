import USERROLES from '../../enums/user';

export default interface User {
  _id: string;
  name: string;
  city: string;
  state: string;
  email: string;
  country: string;
  role: USERROLES;
  createdAt: string;
  updatedAt: string;
  occupation: string;
  phoneNumber: string;
  transactions: string[];
}
