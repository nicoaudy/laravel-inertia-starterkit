import { cloneElement, forwardRef } from 'react';
import { Button as MantineButton } from '@mantine/core';

export const Button = forwardRef(({ sx, dent, ...props }, ref) => {
  return cloneElement(<MantineButton />, {
    sx: {
      ...sx,
      '&:not(:disabled):active': dent ? undefined : { transform: 'none' },
    },
    ref,
    ...props,
  });
});

Button.displayName = 'Button';
