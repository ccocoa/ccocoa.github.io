export const prerender = false;

export async function POST(context) {
  const { request } = context;
  const body = await request.json();
  const { username, levelId, flag } = body;

  const secret = context.locals.runtime.env.FLAG_SECRET || process.env.FLAG_SECRET;
  const normalizedUsername = username.trim().toLowerCase();

  // Logika validasi HMAC
  const expectedFlag = `CTF{SECRET_${levelId}}`;

  if (flag === expectedFlag) {
    return new Response(JSON.stringify({ success: true, message: 'Flag benar!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: false, message: 'Flag salah!' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
}
