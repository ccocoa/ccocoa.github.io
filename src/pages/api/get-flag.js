export const prerender = false;

export async function POST(context) {
  const { request } = context;
  const body = await request.json();
  const { username, levelId } = body;

  const secret = context.locals.runtime.env.FLAG_SECRET || process.env.FLAG_SECRET;
  const normalizedUsername = username.trim().toLowerCase();

  // Logika HMAC
  return new Response(JSON.stringify({ success: true, message: 'Flag generated' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
