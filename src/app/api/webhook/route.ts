export async function POST(request: Request) {
  const res = await request.json()
  console.log(res[0])

  return Response.json("hello")
}
