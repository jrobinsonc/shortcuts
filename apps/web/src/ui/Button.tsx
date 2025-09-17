import type { ReactNode } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

/**
 * Generic button component.
 *
 * @param props - The props of the button.
 * @param props.variant - The variant of the button.
 * @param props.className - The class name of the button.
 * @param props.disabled - If the button is disabled.
 * @returns The button component.
 */
export default function Button({
  variant,
  className,
  ...props
}: ButtonProps): ReactNode {
  return (
    <button
      {...props}
      className={cn(
        'cursor-pointer rounded-md p-2',
        'disabled:cursor-wait disabled:opacity-50',
        {
          'bg-primary text-primary-contrast': variant === 'primary',
          'bg-secondary text-secondary-contrast': variant === 'secondary',
        },
        className,
      )}
    />
  );
}
