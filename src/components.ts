import Form from '~/components/forms/Form.astro';
import ShortText from '~/components/forms/fields/ShortText.astro';
import Email from '~/components/forms/fields/Email.astro';
import LongText from '~/components/forms/fields/LongText.astro';
import Select from '~/components/forms/fields/Select.astro';
import Checkbox from '~/components/forms/fields/Checkbox.astro';
import SearchForm from '~/components/forms/SearchForm.astro';

import Hero from '~/components/widgets/Hero.astro';
import Hero2 from '~/components/widgets/Hero2.astro';
import HeroText from '~/components/widgets/HeroText.astro';
import Content from '~/components/widgets/Content.astro';
import Features from '~/components/widgets/Features.astro';
import Features2 from '~/components/widgets/Features2.astro';
import Features3 from '~/components/widgets/Features3.astro';
import Steps from '~/components/widgets/Steps.astro';
import Steps2 from '~/components/widgets/Steps2.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';
import Stats from '~/components/widgets/Stats.astro';
import FAQs from '~/components/widgets/FAQs.astro';
import Note from '~/components/widgets/Note.astro';

import Page from '~/components/site/Page.astro';
import Landing from '~/components/site/Landing.astro';
import Detail from '~/components/site/Detail.astro';
import VideoDetail from '~/components/site/VideoDetail.astro';
import AboutDetail from '~/components/site/About.astro';

// action      = variant<primary|secondary|tertiary|link>, type<button|submit|reset>, text, icon:tabler, href, target
// item        = title, subtitle, description, icon:tabler, callToAction
// image       = src, alt
// stats       = title, amount, icon:tabler
// price       = title, subtitle, description, price, period, [items], callToAction, hasRibbon, ribbonTitle
// header      = title, subtitle, tagline, type, content, image, action, [actions], banner, stats
// footer      = title, subtitle, cta, faq, faqTitle, [actions], contact
// field       = type, name, label, multiple, [options]

export const supportedTypes = {
  Form, // name, description, disclaimer, [fields], buttonText, actionPath
  ShortText, // name, label, placeholder, autocomplete
  LongText, // name, label, placeholder, rows
  Select, // name, label, options, multiple
  Email, // name, label, placeholder, autocomplete
  Checkbox, // name, label, options, multiple
  SearchForm, // (specialized form component)
  Hero, // content, actions, image
  Hero2, // content, actions, image
  HeroText, // content, callToAction, callToAction2
  Content, // title, subtitle, tagline, [items], image, content, callToAction, columns
  Features, // title, subtitle, tagline, [items], image
  Features2, // title, subtitle, tagline, [items], image
  Features3, // title, subtitle, tagline, [items], image
  Steps, // title, subtitle, tagline, [items], image, callToAction
  Steps2, // title, subtitle, tagline, [items], image, callToAction
  CallToAction, // title, subtitle, tagline, [actions]
  Stats, // title, subtitle, tagline, [stats]
  FAQs, // title, subtitle, tagline, [items], columns
  Note, // icon, subject, statement
  Page, // header, [components], footer
  Landing, // header, [components], footer
  Detail, // header, [components], footer
  VideoDetail, // header, videoId, videoTitle, [components], footer
  AboutDetail, // header, [components], footer
};

export const supportedComponents = {
  'src/data/nav': [
    'Landing',
    'IndustryDetail',
    'ServiceDetail',
    'SoftwareDetail',
    'AboutDetail',
    'VideoDetail',
    'Detail',
    'Page',
  ],
  'src/data/notes': ['Note'],
  'src/data/headers': ['Hero', 'Hero2', 'HeroText'],
  'src/data/banners': ['Features2', 'Features', 'Features3', 'Content', 'CallToAction'],
  'src/data/stats': ['Stats'],
  'src/data/components': [
    'Content',
    'Features',
    'Features2',
    'Features3',
    'Steps',
    'Steps2',
    'CallToAction',
    'Stats',
    'Pricing',
    'Brands',
    'Note',
    'FAQs',
    'SearchForm',
  ],
  'src/data/forms': ['Form'],
  'src/data/faq': ['FAQs'],
  'src/data/cta': ['CallToAction'],
  'src/data/contact': ['Steps2', 'Steps', 'Content', 'Features', 'Features2', 'Features3', 'CallToAction'],
};

export const formFields = {
  ShortText: ShortText,
  LongText: LongText,
  Select: Select,
  Email: Email,
  Checkbox: Checkbox,
};
