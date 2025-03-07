type IStatus =
  | {
      label: string;
      value: string;
    }
  | any;

export type ICatagory = {
  icon?: string | null;
  description?: string;
  name?: string;
  serialNo: number;
  status: string | IStatus;
  id?: number;
  img?: string;
  created_at?: string;
  updated_at?: string;
};

export interface IPackageDetails {
  details: ICatagory | any;
  closeModal: () => void;
}
