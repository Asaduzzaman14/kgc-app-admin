export type IDepositMethod = {
  id?: string;
  maximum: number;
  minimum: number;
  network: string;
  paymentMethod: string;
  walletNo: string;
  createdAt?: string;
  updatedAt?: string;
  status: string;
};

type Istatus = {
  value: string;
  lavel: string;
};
