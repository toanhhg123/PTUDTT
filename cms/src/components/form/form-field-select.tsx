import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Warning } from '@phosphor-icons/react';
import { Controller, type FieldValues, type Path, type UseFormReturn } from 'react-hook-form';

interface PropsType<T extends FieldValues> {
  label?: string;
  form: UseFormReturn<T, unknown>;
  name: Path<T>;
  items: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

function FormFieldSelect<T extends FieldValues>({
  label,
  form,
  name,
  items,
  onChange: onChangeProps,
}: PropsType<T>): React.ReactNode {
  const { control } = form;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, ref, onChange, value }, fieldState }) => {
        const error = fieldState.error?.message;

        return (
          <FormControl error={Boolean(error)} fullWidth>
            <InputLabel>{label}</InputLabel>

            <Select
              ref={ref}
              onBlur={onBlur}
              onChange={(e) => {
                onChangeProps ? onChangeProps(e.target.value) : onChange(e.target.value);
              }}
              value={value || ''}
              label={label}
              variant="outlined"
            >
              {items.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>

            {error ? (
              <FormHelperText>
                <Warning />
                {error}
              </FormHelperText>
            ) : null}
          </FormControl>
        );
      }}
    />
  );
}

export default FormFieldSelect;
