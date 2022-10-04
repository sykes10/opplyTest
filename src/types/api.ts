import type { Supplier, User, Quote } from '@/types/entities';

export type SuccessfulSinupResponse = User;

export type UnsuccessfulSinupResponse = {
  username: string[];
};

export type AuthVariables = {
  username: string;
  password: string;
};

export type SuccessfulLoginResponse = {
  token: string;
};

export type UnsuccessfulLoginResponse = {
  non_field_errors: string[];
  username: string[];
  password: string[];
};

export type StandarAPIResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

export type GetSuppliersResponse = StandarAPIResponse<Supplier>;
export type GetQoutesResponse = StandarAPIResponse<Quote>;
export type GetSuppliersByIDResponse = Supplier;
