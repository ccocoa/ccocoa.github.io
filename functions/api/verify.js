export async function onRequestPost(context) {
  const { request } = context;
  const body = await request.json();
  const { levelId, flag } = body;

  // Logika validasi sederhana
  // Dalam produksi, gunakan database atau secret
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
