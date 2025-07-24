import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@strapi/design-system';
import { Field } from '@strapi/design-system';
import { useField } from '@strapi/strapi/admin';

interface InputProps {
  value: number;
  [key: string]: any;
}


const Input: React.FC<InputProps> = ({ hint, labelAction, label, name, required, attribute, ...props }) => {
  const { value, initialValue, onChange, error, rawError } = useField(name)
  const [localError, setLocalError] = useState<string | undefined>(undefined);
  // Required field validation
  useEffect(() => {
    if (required && (value === null || value === undefined || value === '')) {
      const errMsg = 'This field is required';
      setLocalError(errMsg);
      // onError(errMsg);
    } else {
      setLocalError(undefined);
      // onError(undefined);
    }
  }, [value, required]);

  return (
    <Field.Root {...props} error={localError || error || rawError} name={name} id={name} hint={hint} required={required}>
      <Box>
        <Field.Label action={labelAction} style={{ marginBottom: '0.5rem' }} required={required}>
          {label}
        </Field.Label>
        <Box style={{ display: 'flex', width: '100%', gap: '3px', marginBottom: error || rawError ? '0' : '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {Array.from({ length: attribute.options.max - attribute.options.min + 1 }, (_, i) => i + attribute.options.min).map((num) => (
            <Box
              key={num}
              padding={2}
              borderRadius="4px"
              opacity={props.disabled ? 0.5 : 1}
              background={value === num || num === initialValue ? 'primary600' : 'neutral100'}
              color={'white'}
              borderColor={value === num || num === initialValue ? 'primary600' : 'neutral300'}
              borderWidth="1px"
              borderStyle="solid"
              cursor={props.disabled ? "not-allowed" : "pointer"}
              onClick={props.disabled ? undefined : () => onChange(name, num)}
              textAlign="center"
              minWidth="40px"
            >
              {num}
            </Box>
          ))}
        </Box>
        <Field.Hint />
        <Field.Error />
      </Box>
    </Field.Root>
  );
};

export default Input;
