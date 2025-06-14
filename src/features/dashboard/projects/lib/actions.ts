"use server";

import {
  deleteProject as deleteProjectQuery,
  insertProject as insertProjectQuery,
  updateProject as updateProjectQuery,
} from "@/features/dashboard/projects/lib/queries";
import {
  deleteProjectSchema,
  importProjectsSchema,
  insertProjectSchema,
  updateProjectSchema,
} from "@/features/dashboard/projects/lib/schema";
import type {
  DeleteProjectSchema,
  ImportProjectsSchema,
  InsertProject,
  InsertProjectSchema,
  UpdateProject,
  UpdateProjectSchema,
} from "@/features/dashboard/projects/lib/types";
import { getSession } from "@/shared/lib/auth";
import type { ActionResponse } from "@/shared/lib/types";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function insertProject(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<InsertProjectSchema>> {
  const session = await getSession();

  if (!session) redirect("/");

  const t = await getTranslations("projects");

  const data = Object.fromEntries(formData.entries()) as InsertProjectSchema;

  const result = insertProjectSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: t("actions.invalidInput"),
      errors: {
        name: result.error.formErrors.fieldErrors.name?.[0],
        description: result.error.formErrors.fieldErrors.description?.[0],
        technologies: result.error.formErrors.fieldErrors.technologies?.[0],
        deploymentUrl: result.error.formErrors.fieldErrors.deploymentUrl?.[0],
        repositoryUrl: result.error.formErrors.fieldErrors.repositoryUrl?.[0],
      },
      data,
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

  const projectToInsert: InsertProject = {
    userId: session.user.id,
    name: result.data.name,
    description: result.data.description,
    deploymentUrl: result.data.deploymentUrl,
    repositoryUrl: result.data.repositoryUrl,
    technologies: splittedTechnologies,
  };

  const project = await insertProjectQuery({ project: projectToInsert });

  if (!project) {
    return {
      success: false,
      error: t("actions.creationError"),
      data: result.data,
    };
  }

  revalidatePath("/dashboard/projects");

  return {
    success: true,
    message: t("actions.creationSuccess"),
  };
}

export async function importProjects(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<ImportProjectsSchema>> {
  const session = await getSession();

  if (!session) redirect("/");

  const t = await getTranslations("projects");

  const data = JSON.parse(formData.get("repositories") as string);

  const result = importProjectsSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: t("actions.invalidInput"),
      data: result.data,
    };
  }

  await Promise.all(
    result.data.map((project) =>
      insertProjectQuery({
        project: {
          userId: session.user.id,
          name: project.name,
          description: project.description,
          deploymentUrl: project.deploymentUrl,
          repositoryUrl: project.repositoryUrl,
          technologies: project.technologies,
        },
      }),
    ),
  );

  revalidatePath("/dashboard/projects");

  return {
    success: true,
    message: t("actions.importSuccess"),
  };
}

export async function deleteProject(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<DeleteProjectSchema>> {
  const session = await getSession();

  if (!session) redirect("/");

  const t = await getTranslations("projects");

  const data = Object.fromEntries(formData.entries()) as DeleteProjectSchema;

  const result = deleteProjectSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: t("actions.invalidInput"),
      data,
    };
  }

  const { projectId } = result.data;

  const deletedProject = await deleteProjectQuery({
    projectId,
  });

  if (!deletedProject) {
    return {
      success: false,
      error: t("actions.deletionError"),
      data,
    };
  }

  revalidatePath("/dashboard/projects");

  return {
    success: true,
    message: t("actions.deletionSuccess"),
  };
}

export async function updateProject(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<UpdateProjectSchema>> {
  const session = await getSession();

  if (!session) redirect("/");

  const t = await getTranslations("projects");

  const data = Object.fromEntries(formData.entries()) as UpdateProjectSchema;

  const result = updateProjectSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: t("actions.invalidInput"),
      data,
    };
  }

  const project = result.data;

  const splittedTechnologies = Array.from(
    new Set(
      result.data.technologies
        ?.split(",")
        .map((technology) => technology.trim())
        .filter((technology) => technology !== ""),
    ),
  );

  const newProject: UpdateProject = {
    id: project.id,
    userId: session.user.id,
    name: project.name,
    description: project.description,
    deploymentUrl: project.deploymentUrl,
    repositoryUrl: project.repositoryUrl,
    technologies: splittedTechnologies,
  };

  const updatedProject = await updateProjectQuery({
    project: newProject,
  });

  if (!updatedProject) {
    return {
      success: false,
      error: t("actions.updateError"),
      data,
    };
  }

  revalidatePath("/dashboard/projects");

  return {
    success: true,
    message: t("actions.updateSuccess"),
  };
}
