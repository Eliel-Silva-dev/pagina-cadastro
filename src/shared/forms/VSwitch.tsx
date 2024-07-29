import { useEffect, useState } from 'react';
import { Switch, SwitchProps } from '@mui/material';
import { useField } from '@unform/core';

type TVSwitchProps = SwitchProps & {
  name: string;
};

export const VSwitch: React.FC<TVSwitchProps> = ({
  name,
  ...rest
}: TVSwitchProps) => {
  const { fieldName, defaultValue, registerField, error, clearError } =
    useField(name);

  const [value, setValue] = useState(defaultValue || false);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, value) => setValue(value),
    });
  }, [fieldName, value, registerField]);

  return (
    <Switch
      {...rest}
      defaultChecked={defaultValue}
      checked={value || false}
      onChange={(e, checked) => {
        setValue(checked);
        rest.onChange?.(e, checked);
        error && clearError();
      }}
    />
  );
};
