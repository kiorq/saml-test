export async function GET() {
  return Response.json({
    results: [{ id: 1, originalText: "Hello world", ssml: "Hello world" }],
  });
}
