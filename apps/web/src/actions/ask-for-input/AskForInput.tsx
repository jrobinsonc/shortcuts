'use client';

import Button from '@/ui/Button';
import TextInput from '@/ui/TextInput';
import { useRef, useState } from 'react';

interface AskForInputProps {
  // validate?: (value: string) => boolean;
  // onCancel?: () => void;
  // handleSubmit: (value: string) => void;
}

export default function AskForInput(
  {
    // onCancel,
    // handleSubmit,
  }: AskForInputProps,
) {
  const [value, setValue] = useState('');

  const cancelInput = () => {
    // onCancel();
  };

  const submitInput = () => {
    // handleSubmit(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <TextInput
        autoFocus
        onChangeValue={setValue}
        validate={['required']}
        description="Enter the value."
      />

      <div className="flex gap-2 justify-end">
        <Button variant="secondary" onClick={cancelInput}>
          Cancel
        </Button>
        <Button variant="primary" onClick={submitInput}>
          Submit
        </Button>
      </div>
    </div>
  );
}
