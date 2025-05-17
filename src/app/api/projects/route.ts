import { getRepositories } from "@/app/(app)//dashboard/projects/_lib/queries";

export async function GET() {
  const repositories = await getRepositories();

  return Response.json(repositories);
}
