import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@strapi/design-system';
import { Field } from '@strapi/design-system';
import { useField } from '@strapi/strapi/admin';

interface InputProps {
  value: number;
  [key: string]: any;
}


const Input: React.FC<InputProps> = ({ hint, labelAction, label, name, required, attribute, ...props }) => {
  const field = useField(name);
  const [value, setValue] = useState(field.value);
  useEffect(() => {
    field.onChange(name, value);
  }, [value]);

  return (
    <Field.Root error={props.error} name={name} id={name} hint={hint} required={required}>
      <Box>
        <Field.Label action={labelAction} style={{ marginBottom: '0.5rem' }}>
          {label}
        </Field.Label>
        <Box style={{ display: 'flex', width: '100%', gap: '3px', flexWrap: 'wrap', alignItems: 'center' }}>
          {Array.from({ length: attribute.options.max - attribute.options.min + 1 }, (_, i) => i + attribute.options.min).map((num) => (
            <Box
              key={num}
              padding={2}
              borderRadius="4px"
              opacity={props.disabled ? 0.5 : 1}
              background={field.value === num ? 'primary600' : 'neutral100'}
              color={'white'}
              borderColor={field.value === num ? 'primary600' : 'neutral300'}
              borderWidth="1px"
              borderStyle="solid"
              cursor={props.disabled ? "not-allowed" : "pointer"}
              onClick={props.disabled ? undefined : () => setValue(num)}
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
