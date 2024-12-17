import yaml from 'js-yaml';

import { generateLinks } from '~/utils/generator';

export const prerender = true;

export async function GET() {
  return new Response(yaml.dump(generateLinks(), { sortKeys: true }), {
    headers: {
      'content-type': 'application/yaml;charset=UTF-8',
    },
  });
}
