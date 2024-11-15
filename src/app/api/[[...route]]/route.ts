import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from 'hono/cookie';

const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
  const allCookies = getCookie(c);
  return c.json({
    message: 'Hello Next.js!',
    cookies: allCookies
  })
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);