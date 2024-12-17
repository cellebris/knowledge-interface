export interface MetaData {
  title?: string;
  ignoreTitleTemplate?: boolean;

  canonical?: string;

  robots?: MetaDataRobots;

  description?: string;

  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
}

export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
}

export interface MetaDataImage {
  url: string;
  width?: number;
  height?: number;
}

export interface MetaDataOpenGraph {
  url?: string;
  siteName?: string;
  images?: Array<MetaDataImage>;
  locale?: string;
  type?: string;
}

export interface MetaDataTwitter {
  handle?: string;
  site?: string;
  cardType?: string;
}

export interface ContentHeader {
  type?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;

  note?: string;
  banner?: string;
  stats?: string;
}

export interface ContentFooter {
  type?: string;
  title?: string;
  subtitle?: string;

  note?: string;
  faq?: string;
  faqTitle?: string;
  contact?: string;
}

export interface Page {
  header: ContentHeader;
  components: Array<string>;
  footer: ContentFooter;
}

export interface VideoPage {
  header: ContentHeader;
  videoId?: string;
  videoTitle?: string;
  components: Array<string>;
  footer: ContentFooter;
}
