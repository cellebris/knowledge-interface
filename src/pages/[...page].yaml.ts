import yaml from 'js-yaml';

import { generateLinks, generateData } from '~/utils/generator';

export const prerender = true;

export function getStaticPaths() {
  return generateLinks().map((path) => {
    return { params: { page: path } };
  });
}

export async function GET({ params }) {
  const pageData = generateData(params.page);
  return new Response(yaml.dump(pageData, { sortKeys: true }), {
    headers: {
      'content-type': 'application/yaml;charset=UTF-8',
    },
  });
}
