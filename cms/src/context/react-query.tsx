'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface PropsType {
  children: React.ReactNode;
}

const queryClient = new QueryClient({ defaultOptions: { queries: {} } });

export default function ReactQueryContext({ children }: PropsType): React.ReactNode {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
