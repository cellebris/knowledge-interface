import { generateSite } from '~/utils/generator';

export const prerender = true;

export async function GET() {
  return new Response(JSON.stringify(await generateSite()), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}
