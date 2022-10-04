export type User = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  auth_token: string;
};

export type Supplier = {
  id: number;
  name: string;
  description: string;
  code?: string;
  type?: string;
};
export type Quote = {
  id: number;
  amount: string;
  created: string;
  title: string;
  supplier_id: number;
};
