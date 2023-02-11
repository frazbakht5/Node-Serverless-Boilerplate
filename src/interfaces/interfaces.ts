export interface IForgetPassword {
  token: string;
  code: string;
  email: string;
}
export interface IAdminLogin {
  email: string;
  password: string;
}
export interface IAdmin {
  _id?: string;
  name: string;
  email: string;
  password: string;
  token?: string;
  imageUrl?: string;
}
export interface ICheckout {
  cardNumber: string;
  cardName: string;
  cardExpiryDate: string;
  cardCCV: string;
  address: string;
  state: string;
  city: string;
  zipCode: number;
  amount: number;
  plan: string;
  expiry: number;
}
