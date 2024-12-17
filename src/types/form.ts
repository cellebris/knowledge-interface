import type { Headline, Widget } from '~/types/display';

export interface Option {
  name: string;
  label?: string;
}

export interface FormItem {
  type: string;
  name: string;
  label?: string;
  multiple?: boolean;
  options?: Array<Option>;
  default?: unknown;
}

export interface FormLabel {
  name: string;
  label?: string;
  required?: boolean;
}

export interface FormError {
  error?: Error;
}

export interface Form extends Omit<Headline, 'classes'>, Widget {
  name: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
  redirect?: string;
  fields: Array<FormItem>;
  disclaimer?: string;
  buttonText?: string;
  note?: string;
}

export interface BaseField {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: Error;
  value?: string | Array<string>;
}

export interface AutocompleteField extends BaseField {
  autocomplete?: string;
}

export interface SelectField extends BaseField {
  multiple: boolean;
  options: Array<Option>;
}

export interface MultiLineField extends BaseField {
  rows?: number;
}

export interface SearchDisplay {
  display?: boolean;
}
