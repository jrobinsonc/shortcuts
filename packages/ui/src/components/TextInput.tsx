import { ChangeEvent, useState } from 'react';
import type { InputHTMLAttributes, RefObject, KeyboardEvent } from 'react';
import { cn } from '@repo/ui/utils/cn';
import { useId } from 'react';
import { Button } from './Button';

//TODO - Move these rules to a separate file and finish the validation logic.
type ValidationRuleRegExp = RegExp;
type ValidationRuleList = (
  | 'required'
  | 'email'
  | 'url'
  | 'phone'
  | 'date'
  | 'time'
  | 'datetime'
)[];
type ValidationRuleFunction = (value: string) => true | string;

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  ref?: RefObject<HTMLInputElement | null>;
  /**
   * Validate the input value.
   *
   * FIXME - finish this
   */
  validate?: ValidationRuleRegExp | ValidationRuleList | ValidationRuleFunction;
  /**
   * Make the input multi-line.
   *
   * FIXME - finish this
   */
  rows?: number;
  onChangeValue?: (value: string) => void;
}

const defaultValidationMessage: string = 'Invalid value.';
const validationMessages: Record<ValidationRuleList[number], string> = {
  required: 'This field is required.',
  email: 'Invalid email address.',
  url: 'Invalid URL.',
  phone: 'Invalid phone number.',
  date: 'Invalid date.',
  time: 'Invalid time.',
  datetime: 'Invalid datetime.',
} as const;

/**
 * Validate the value of the input.
 *
 * @todo - Move this to a separate file and use Zod.
 * @param value - The value of the input.
 * @param rule - The validation rule.
 * @returns The validation result.
 */
function validateValue(
  value: string,
  rule: TextInputProps['validate'],
): true | string {
  if (rule instanceof RegExp) {
    return rule.test(value) ? true : defaultValidationMessage;
  }

  if (typeof rule === 'function') {
    return rule(value);
  }

  if (Array.isArray(rule)) {
    const result = rule.find((rule: ValidationRuleList[number]) => {
      switch (rule) {
        case 'required':
          return value.length === 0;
        case 'email':
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        case 'url':
          return /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value);
        case 'phone':
          return /^[0-9]{10}$/.test(value);
        case 'date':
          return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value);
        case 'time':
          return /^[0-9]{2}:[0-9]{2}$/.test(value);
        case 'datetime':
          return /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(
            value,
          );
        default:
          return undefined;
      }
    });

    if (result === undefined) {
      return true;
    }

    return validationMessages[result];
  }

  return true;
}

/**
 * A text input controlled component.
 *
 * @param props - The props for the text input.
 * @returns A text input component with a label and a validation.
 */
export function TextInput({
  className,
  label,
  description,
  ref,
  validate,
  onChangeValue,
  rows = 1,
  ...props
}: TextInputProps) {
  //FIXME - Since using `useId` the `props.id` is not used. Decide what to do with it.
  const inputId = useId();
  const descriptionId = description ? `${inputId}-description` : undefined;
  const [error, setError] = useState<string | null>(null);
  const isMultiLine = rows > 1;

  if (isMultiLine) {
    throw new Error('Multi-line text inputs are not supported yet');
  }

  //TODO - Optimize this.
  const runValidation = (value: string) => {
    const result = validateValue(value, validate);

    setError(result === true ? null : result);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={inputId}>{label}</label>}

      <input
        {...props}
        type="text"
        id={inputId}
        ref={ref}
        className={cn('border border-primary rounded-md p-2', className)}
        aria-describedby={descriptionId}
        onKeyDown={(evt: KeyboardEvent<HTMLInputElement>) => {
          if (!isMultiLine && evt.key === 'Enter') {
            runValidation(evt.currentTarget.value);
          }
        }}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          const value: string = evt.target.value;

          // If there is already an error, run the validation again.
          if (error !== null) {
            runValidation(value);
          }

          onChangeValue?.(value);
        }}
      />

      {/* Hide the description if there is an error. */}
      {description && !error && (
        <span id={descriptionId} className="text-muted text-sm">
          {description}
        </span>
      )}

      {error && <span className="text-error text-sm">{error}</span>}
    </div>
  );
}
