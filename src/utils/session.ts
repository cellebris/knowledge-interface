import type { APIContext } from 'astro';

export function getSession(context: APIContext): string {
  const sessionCookie = context.cookies.get(import.meta.env.SESSION_COOKIE_NAME);
  let sessionId = sessionCookie ? sessionCookie.value : null;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    context.cookies.set(import.meta.env.SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      sameSite: 'strict',
      secure: import.meta.env.PROD,
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    });
  }
  return sessionId;
}
