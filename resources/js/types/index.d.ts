import type { Page, PageProps, Errors, ErrorBag } from "@inertiajs/inertia";
import { User } from "@/types/user";

export type DateTime = string;

export type Nullable<T> = T | null;

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
};
