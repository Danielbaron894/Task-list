export interface Item {
  _id: string;
  title: string;
  isDone: boolean;
  date: Date;
  customerId: string;
}

export interface customer {
  _id: string;
  name: string;
  occupation: string;
  phone: string;
  email: string;
}
