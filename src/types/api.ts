export type SuccessfulSinupResponse = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  auth_token: string;
};

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
};
