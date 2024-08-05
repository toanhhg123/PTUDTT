import React from 'react';
import { brandApi } from '@/services/brand';
import { useQuery } from '@tanstack/react-query';
import { type UseFormReturn } from 'react-hook-form';

import FormFieldSelect from '../form/form-field-select';
import { type ProductForm } from './form-schema';

interface PropsType {
  form: UseFormReturn<ProductForm>;
}

function FormFieldBrand({ form }: PropsType): React.ReactNode {
  const { data, isPending } = useQuery({
    queryFn: () => brandApi.gets(),
    queryKey: [brandApi.url],
  });

  const categories = data?.data.data || [];
  if (isPending) return null;

  return (
    <FormFieldSelect
      form={form}
      name="brandId"
      label="Brand"
      items={categories.map((brand) => ({ value: brand.id.toString(), label: brand.name }))}
      onChange={(value) => {
        form.setValue('brandId', Number(value));
      }}
    />
  );
}

export default FormFieldBrand;
