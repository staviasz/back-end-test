export interface AddAccountData {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  perform: (data: AddAccountData) => Promise<Error | string>;
}
