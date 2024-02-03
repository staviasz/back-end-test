export interface AccountData {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  perform: (accountData: AccountData) => Promise<string>;
}
