import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'user', title: 'User', href: paths.dashboard.user, icon: 'users' },
  { key: 'products', title: 'Products', href: paths.dashboard.product, icon: 'product' },
  { key: 'category', title: 'Category', href: paths.dashboard.category, icon: 'category' },
  { key: 'brand', title: 'Brand', href: paths.dashboard.brand, icon: 'brand' },
  { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
