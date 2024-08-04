import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/system/Unstable_Grid';
import { useForm } from 'react-hook-form';

import FormFieldInput from '../form/form-field-input';
import { formSchema, type BrandForm } from './form-schema';

interface PropsType {
  defaultValues: BrandForm;
  onSubmit: (_value: BrandForm) => void;
  loading: boolean;
}

function FormBrand({ defaultValues, onSubmit, loading }: PropsType): React.ReactNode {
  const form = useForm<BrandForm>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <FormFieldInput form={form} name="name" label="Name" />
        </Grid>

        <Grid xs={12}>
          <FormFieldInput form={form} name="note" label="Note" />
        </Grid>

        <Grid xs={12}>
          <LoadingButton loading={loading} type="submit" sx={{ width: '100%' }} variant="contained" color="primary">
            Save
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
}

export default FormBrand;
