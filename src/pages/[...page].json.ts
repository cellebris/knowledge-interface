import { generateLinks, generateData } from '~/utils/generator';

export const prerender = true;

export function getStaticPaths() {
  return generateLinks().map((path) => {
    return { params: { page: path } };
  });
}

export async function GET({ params }) {
  const pageData = generateData(params.page);
  return new Response(JSON.stringify(pageData), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}
