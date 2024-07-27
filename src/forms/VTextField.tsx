import { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

type TVTextFieldProps = TextFieldProps & {
  name: string;
};

export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest}) => {
  const { fieldName, defaultValue, registerField, error, clearError } =
    useField(name);

  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, value) => setValue(value),
    });
  }, [fieldName, value, registerField]);

  return (
    <TextField
      {...rest}
      defaultValue={defaultValue}
      value={value || ''}
      error={!!error}
      helperText={error}
      onKeyDown={(e) => {
        error && clearError();
        rest.onKeyDown?.(e);
      }}
      onChange={(e) => {
        setValue(e.target.value);
        rest.onChange?.(e);
      }}
    />
  );
};
