import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { HTMLInputTypeAttribute } from 'astro/types';

export type HTMLInputTypeAttribute = HTMLInputTypeAttribute;

export type {
  Image,
  Video,
  VideoPlayer,
  Social,
  Item,
  ItemGrid,
  Collapse,
  Widget,
  Note,
  Headline,
  CallToAction,
  Hero,
  Features,
  Content,
  Steps,
  Faqs,
  Stat,
  Stats,
} from '~/types/display';

export type {
  Option,
  FormItem,
  FormLabel,
  FormError,
  Form,
  BaseField,
  AutocompleteField,
  SelectField,
  MultiLineField,
  SearchDisplay,
} from '~/types/form';

export type { MetaData, ContentHeader, ContentFooter, Page, VideoPage } from '~/types/page';

export interface LoaderConfig {
  name: string;
  type: string;
  tag: AstroComponentFactory;
  props: Record<string, unknown>;
}

export interface RouterConfig {
  name: string;
  props: Record<string, string | Array | unknown>;
}
