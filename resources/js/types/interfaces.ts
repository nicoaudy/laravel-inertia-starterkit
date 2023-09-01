import { DateTime } from './index';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: DateTime;
  created_at: DateTime;
  deleted_at: DateTime;
  photo: string;
}

export interface Contact {
  address: string;
  city: string;
  country: string;
  created_at: string;
  deleted_at: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  postal_code: string;
  region: string;
  updated_at: string;
}

export interface Link {
  active: boolean;
  label: string;
  url: string;
}

export interface IDefaultData {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: any;
  pivot: PivotPermission;
}

export interface PivotPermission {
  role_id: number;
  permission_id: number;
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: RolePivot;
  permissions: Permission[];
}

export interface RolePivot {
  model_id: number;
  role_id: number;
  model_type: string;
}

export interface Flash {
  error: string;
  success: string;
}
