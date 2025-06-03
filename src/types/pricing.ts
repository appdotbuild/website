import type { Route } from 'next';

import type { ButtonProps } from '@/components/shared/button';

export interface PricingTableFeatures {
  name: string;
  features: {
    name: string;
    tooltip?: string;
    plans: Record<string, boolean | string | { title: string; description: string }>;
  }[];
}

export interface PricingFeature {
  name: string;
  included: boolean | string;
}

export interface PricingPlanFeature {
  label: string;
  icon?: string;
  tooltip?: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  price: string;
  description: string;
  button: {
    text: string;
    link: Route<string> | URL;
    variant: ButtonProps['variant'];
  };
  points: {
    title: string;
    description?: string;
  }[];
  pointsIcon: string;
}
