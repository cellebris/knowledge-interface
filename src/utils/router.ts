import type { APIContext } from 'astro';
import type { RouterConfig as Card } from '~/types';
import { getObject } from '~/utils/loader';

export function routes(): Array<Card> {
  const nav = getObject('src/data/nav');
  const paths: Array<Card> = [];

  for (const path in nav) {
    const card: Card = {
      name: path,
      props: nav[path],
    };
    paths.push(card);
  }
  return paths;
}

export function getLayout(name: string | undefined): Record<string, unknown> {
  const props: Record<string, unknown> = {};

  if (name) {
    const loadCache = getObject('src/data/nav');

    if (Object.hasOwn(loadCache, name) && loadCache[name].metadata) {
      const metadata = loadCache[name].metadata;

      if (Object.hasOwn(metadata, 'announcement')) {
        props['announcement'] = metadata.announcement;
        delete metadata['announcement'];
      }
      if (Object.hasOwn(metadata, 'header')) {
        props['header'] = metadata.header;
        delete metadata['header'];
      }
      if (Object.hasOwn(metadata, 'footer')) {
        props['footer'] = metadata.footer;
        delete metadata['footer'];
      }
      props['metadata'] = Object.assign({}, metadata);
    }
  }
  return props;
}

export function checkRedirect(context: APIContext): string | null {
  const requestPath = context.url.pathname;
  if (requestPath[0] != '_' && !requestPath.includes('.')) {
    if (requestPath.startsWith('/nav/')) {
      return requestPath.replace(/^\/nav/, '');
    }
  }
  return null;
}

export function checkRewrite(context: APIContext): string | null {
  const requestPath = context.url.pathname;
  if (requestPath[0] != '_' && !requestPath.includes('.')) {
    // No rewrite rules right now
  }
  return null;
}
