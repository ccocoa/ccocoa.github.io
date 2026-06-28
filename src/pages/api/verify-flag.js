export const prerender = false;

export async function POST({ request, locals }) {
  const body = await request.json();
  const { username, flag } = body;

  if (!username || !flag) {
    return new Response(JSON.stringify({ error: 'Username and flag are required' }), { status: 400 });
  }

  const normalizedUsername = username.trim().toLowerCase();
  const secret = locals.runtime.env.FLAG_SECRET;

  if (!secret) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
  }

  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(normalizedUsername);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  const expectedFlag = `CTF{${hashHex}}`;

  if (flag === expectedFlag) {
    return new Response(JSON.stringify({ success: true, message: 'Flag valid!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: false, message: 'Flag invalid!' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
  });
}
