import { BEARER } from '$env/static/private'
/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
  const req = await request.json();

  const token = BEARER;
  const chatgptUrl = 'https://api.openai.com/v1/completions';

  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
  const response = await fetch(chatgptUrl, {
    method,
    headers,
    body: JSON.stringify(req)
  });
  return new Response(await response.text());
}
