import type { Headline, Widget } from '~/types/display';

export interface RadioOption {
  name: string;
  title?: string;
  label?: string;
  icon?: string;
}

export interface SelectOption {
  name: string;
  label?: string;
}

export interface FormItem {
  type: string;
  name: string;
  label?: string;
  multiple?: boolean;
  options?: Array<SelectOption>;
  default?: unknown;
}

export interface FormColumnsItem {
  type: string;
  name: string;
  label?: string;
  columns: Array<FormColumn>;
  topClass?: string;
  columnClass?: string;
  fieldClass?: string;
}

export interface ButtonItem {
  variant: 'primary' | 'secondary' | 'tertiary' | 'link';
  type: 'submit' | 'reset' | 'button' | 'link';
  name: string;
  label?: string;
  redirect?: string;
  target?: string;
  url?: string;
}

export interface FormLabel {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
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
  system?: boolean;
  profile?: boolean;
  fields: Array<FormItem>;
  buttons: Array<ButtonItem>;
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
  value: string | Array<string>;
}

export interface FormColumn {
  fields: Array<FormItem>;
}

export interface ColumnsField {
  formName: string;
  name: string;
  label?: string;
  columns: Array<FormColumn>;
  topClass?: string;
  columnClass?: string;
  errors: object;
  values: object;
}

export interface AutocompleteField extends BaseField {
  autocomplete?: string;
}

export interface PasswordField extends BaseField {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface RadiosField extends BaseField {
  instruction?: string;
  options: Array<RadioOption>;
}

export interface AgreementField extends BaseField {
  instruction?: string;
}

export interface SelectField extends BaseField {
  multiple: boolean;
  options: Array<SelectOption>;
}

export interface MultiLineField extends BaseField {
  rows?: number;
}

export interface SearchDisplay {
  display?: boolean;
}
