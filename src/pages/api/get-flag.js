export const prerender = false;

export async function POST({ request, locals }) {
  const body = await request.json();
  const { username } = body;
  
  if (!username) {
    return new Response(JSON.stringify({ error: 'Username is required' }), { status: 400 });
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

  return new Response(JSON.stringify({ flag: `CTF{${hashHex}}` }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
