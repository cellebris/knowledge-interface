import { generateLinks } from '~/utils/generator';

export const prerender = true;

export async function GET() {
  return new Response(JSON.stringify(generateLinks()), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}
