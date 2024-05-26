export interface IPurchaseHistory {
  a2i_token: number;
  availability: number;
  created_at: string; // Date in ISO 8601 format
  daily_token: number;
  date: string; // Date and time in ISO 8601 format
  duration: number;
  email: string;
  hashpower: number;
  id: number;
  image: string | null;
  is_deleted: number;
  name: string;
  package_name: string;
  package_price: number;
  status: number;
  updated_at: string; // Date in ISO 8601 format
}
