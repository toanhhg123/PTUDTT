import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/system/Unstable_Grid';
import { useForm } from 'react-hook-form';

import { EnumRole } from '@/types/user';

import FormFieldInput from '../form/form-field-input';
import FormFieldSelect from '../form/form-field-select';
import { formSchema, type UserForm as UserFormType } from './form-schema';

interface PropsType {
  defaultValues: UserFormType;
  onSubmit: (_value: UserFormType) => void;
  loading: boolean;
}

function FormUser({ defaultValues, onSubmit, loading }: PropsType): React.ReactNode {
  const form = useForm<UserFormType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <FormFieldInput form={form} name="name" label="Full name" />
        </Grid>

        <Grid xs={12} md={6}>
          <FormFieldInput form={form} name="username" label="Username" />
        </Grid>

        <Grid xs={12} md={6}>
          <FormFieldInput form={form} name="email" label="Email" />
        </Grid>

        <Grid xs={12} md={6}>
          <FormFieldInput form={form} name="password" label="Password" />
        </Grid>

        <Grid xs={12}>
          <FormFieldInput form={form} name="phone" label="Phone" />
        </Grid>

        <Grid xs={12}>
          <FormFieldSelect
            form={form}
            name="role"
            label="Role"
            items={Object.values(EnumRole).map((value) => ({ value, label: value }))}
          />
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

export default FormUser;
