
export enum TemplateType {
  WORD = 'Word',
  EXCEL = 'Excel',
  PDF = 'PDF',
  POWERPOINT = 'PowerPoint',
}

export type TemplateCategory = 'Agile' | 'Waterfall' | 'IT' | 'Telecom' | 'Construction' | 'Risk Management' | 'Budgeting' | 'Reporting' | 'Stakeholder Management';

export interface Template {
  id: number;
  name: string;
  description: string;
  type: TemplateType;
  category: TemplateCategory;
  previewImage: string;
  downloadUrl: string;
  isPremium: boolean;
}

export type SubscriptionTier = 'FREE' | 'MONTHLY' | 'YEARLY';

export interface User {
  id: number;
  name: string;
  email: string;
  subscriptionTier: SubscriptionTier;
}

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  price: string;
  period: string;
  features: string[];
}
