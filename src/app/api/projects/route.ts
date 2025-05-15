import { getRepositories } from "@/lib/queries/github";

export async function GET() {
  const repositories = await getRepositories();

  return Response.json(repositories);
}
