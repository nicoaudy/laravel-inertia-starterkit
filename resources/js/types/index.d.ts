import type { Page, PageProps, Errors, ErrorBag } from '@inertiajs/inertia';

export type DateTime = string;

export type Nullable<T> = T | null;

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: DateTime;
  created_at: DateTime;
  deleted_at: DateTime;
  photo: string;
  photo_path: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
};
