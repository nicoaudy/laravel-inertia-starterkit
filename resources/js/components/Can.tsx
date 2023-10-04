import React from "react";
import { usePage } from "@inertiajs/react";

interface Props {
  permission?: string | string[];
  children?: React.ReactNode;
}

export function Can({ children, permission }: Props) {
  const props = usePage().props;
  const auth = props.auth as any;

  const allowedPermissions = Object.keys(auth.can).filter((p) => auth.can[p]);
  let allowed = true;

  if (permission) {
    if (Array.isArray(permission)) {
      // Check if any of the provided permissions match
      allowed = permission.some((p) => allowedPermissions.includes(p));
    } else {
      allowed = allowedPermissions.includes(permission);
    }
  }

  return allowed ? <React.Fragment>{children}</React.Fragment> : null;
}
