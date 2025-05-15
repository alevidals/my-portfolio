"use server";

import { insertProject as insertProjectQuery } from "@/lib/queries/projects";
import { insertProjectSchema } from "@/lib/schema/projects";
import type { ActionResponse } from "@/lib/types/action";
import type { InsertProjectSchema } from "@/lib/types/projects";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function insertProject(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<InsertProjectSchema>> {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const data = Object.fromEntries(formData.entries()) as InsertProjectSchema;

  const result = insertProjectSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid input",
      errors: {
        name: result.error.formErrors.fieldErrors.name?.[0],
        description: result.error.formErrors.fieldErrors.description?.[0],
        technologies: result.error.formErrors.fieldErrors.technologies?.[0],
        deploymentUrl: result.error.formErrors.fieldErrors.deploymentUrl?.[0],
        repositoryUrl: result.error.formErrors.fieldErrors.repositoryUrl?.[0],
      },
      ...data,
    };
  }

  const splittedTechnologies = Array.from(
    new Set(
      result.data.technologies
        ?.split(",")
        .map((technology) => technology.trim())
        .filter((technology) => technology !== ""),
    ),
  );

  const project = await insertProjectQuery({
    project: {
      userId,
      name: result.data.name,
      description: result.data.description,
      deploymentUrl: result.data.deploymentUrl,
      repositoryUrl: result.data.repositoryUrl,
      technologies: splittedTechnologies,
    },
  });

  if (!project) {
    return {
      success: false,
      error: "Failed to create project",
      ...result.data,
    };
  }

  revalidatePath("/dashboard/projects");

  return {
    success: true,
    message: "Project created successfully",
  };
}
