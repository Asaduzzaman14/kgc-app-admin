type IStatus =
  | {
      label: string;
      value: string;
    }
  | any;

export type ICatagory = {
  img?: string | null;
  description?: string;
  name?: string;

  status: string | IStatus;
  id?: number;
  created_at?: string;
  updated_at?: string;
};

export interface IPackageDetails {
  details: ICatagory | any;
  closeModal: () => void;
}
