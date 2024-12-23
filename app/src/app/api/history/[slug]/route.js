export async function GET(req, { params }) {
  const { slug } = params; // Extract the dynamic 'slug' from the route
  return new Response(JSON.stringify({ message: `You accessed history with slug: ${slug}` }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


// yaha pr post route bhi banaya hu but iski koi jarurt nahi hai

// export async function POST(req, { params }) {
//   const { slug } = params;
//   const body = await req.json(); // Parse the request body
//   return new Response(JSON.stringify({ message: `POST request received for slug: ${slug}`, body }), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }
