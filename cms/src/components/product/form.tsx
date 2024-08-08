import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/system/Unstable_Grid';
import { useForm } from 'react-hook-form';

import { FormFieldFile } from '../form/form-field-file';
import FormFieldInput from '../form/form-field-input';
import FormFieldNumber from '../form/form-field-number';
import FormFieldBrand from './form-brand';
import FormFieldCategory from './form-category';
import { formSchema, type ProductForm } from './form-schema';

interface PropsType {
  defaultValues: ProductForm;
  onSubmit: (_value: ProductForm) => void;
  loading: boolean;
}

function FormProduct({ defaultValues, onSubmit, loading }: PropsType): React.ReactNode {
  const form = useForm<ProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <FormFieldInput form={form} name="productName" label="Name" />
        </Grid>

        <Grid xs={12}>
          <FormFieldNumber form={form} name="stock" label="Stock" />
        </Grid>

        <Grid xs={6}>
          <FormFieldNumber form={form} name="purchasePrice" label="Purchase Price" />
        </Grid>

        <Grid xs={6}>
          <FormFieldNumber form={form} name="sellPrice" label="Sell Price" />
        </Grid>

        <Grid xs={12}>
          <FormFieldFile form={form} name="imageFile" label="Image" defaultPreviewImage="image" />
        </Grid>

        <Grid xs={12}>
          <FormFieldCategory form={form} />
        </Grid>

        <Grid xs={12}>
          <FormFieldBrand form={form} />
        </Grid>

        <Grid xs={12}>
          <FormFieldInput form={form} name="desc" label="Note" />
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

export default FormProduct;
