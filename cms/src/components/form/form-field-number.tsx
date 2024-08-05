import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { Warning } from '@phosphor-icons/react';
import { Controller, type FieldValues, type Path, type UseFormReturn } from 'react-hook-form';

interface PropsType<T extends FieldValues> {
  label?: string;
  form: UseFormReturn<T, unknown>;
  name: Path<T>;
}

function FormFieldNumber<T extends FieldValues>({ label, form, name }: PropsType<T>): React.ReactNode {
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
            <OutlinedInput
              ref={ref}
              onBlur={onBlur}
              value={String(value || '')}
              label={label}
              type="number"
              onChange={(e) => {
                onChange(Number(e.target.value));
              }}
            />

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

export default FormFieldNumber;
