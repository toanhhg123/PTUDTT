import React from 'react';
import { categoryApi } from '@/services/category';
import { useQuery } from '@tanstack/react-query';
import { type UseFormReturn } from 'react-hook-form';

import FormFieldSelect from '../form/form-field-select';
import { type ProductForm } from './form-schema';

interface PropsType {
  form: UseFormReturn<ProductForm>;
}

function FormFieldCategory({ form }: PropsType): React.ReactNode {
  const { data, isPending } = useQuery({
    queryFn: () => categoryApi.gets(),
    queryKey: [categoryApi.url],
  });

  const categories = data?.data.data || [];
  if (isPending) return null;

  return (
    <FormFieldSelect
      form={form}
      name="categoryId"
      label="Category"
      items={categories.map((category) => ({ value: category.id.toString(), label: category.name }))}
      onChange={(value) => {
        form.setValue('categoryId', Number(value));
      }}
    />
  );
}

export default FormFieldCategory;
