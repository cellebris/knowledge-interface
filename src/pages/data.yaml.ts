import yaml from 'js-yaml';

import { generateSite } from '~/utils/generator';

export const prerender = true;

export async function GET() {
  return new Response(yaml.dump(await generateSite(), { sortKeys: true }), {
    headers: {
      'content-type': 'application/yaml;charset=UTF-8',
    },
  });
}
