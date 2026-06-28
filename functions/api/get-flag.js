export const prerender = false;

export async function onRequestPost(context) {
  const { request } = context;
  const body = await request.json();
  const { username, levelId } = body;

  const secret = context.locals.runtime.env.FLAG_SECRET || process.env.FLAG_SECRET;
  const normalizedUsername = username.trim().toLowerCase();

  // Logika HMAC (contoh)
  // const crypto = require('crypto');
  // const hmac = crypto.createHmac('sha256', secret).update(normalizedUsername + levelId).digest('hex');

  return new Response(JSON.stringify({ success: true, message: 'Flag generated' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
