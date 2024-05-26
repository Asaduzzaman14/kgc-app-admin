export type IDeposit =
  | {
      id: number;
      user_id: string;
      received_by: string;
      received_from: string;
      amount: string;
      type: string;
      status: string;
      txn_id: string;
      method: string;
      wallet_id: string;
      description: string;
      name: string;
      email: string;
      wallet_name: string;
      wallet_no: string;
      network: string;
      created_at: string;
      updated_at: string;
    }
  | any;
