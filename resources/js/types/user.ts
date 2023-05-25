import { DateTime } from '@/types';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: DateTime;
  created_at: DateTime;
  deleted_at: DateTime;
  photo: string;
}
