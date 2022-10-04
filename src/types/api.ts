import type { User } from "@/types/user";

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
