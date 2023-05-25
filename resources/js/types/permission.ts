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
