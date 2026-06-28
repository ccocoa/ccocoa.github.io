export async function onRequestPost(context) {
  const { request, env } = context;
  const { flag } = await request.json();
  
  const secretFlag = env.SECRET_FLAG;

  if (flag === secretFlag) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: false }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' },
  });
}
