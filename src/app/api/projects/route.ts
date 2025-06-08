import { getRepositories } from "@/features/dashboard/projects/lib/queries";

export async function GET() {
  const repositories = await getRepositories();

  return Response.json(repositories);
}
