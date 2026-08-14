
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Json } from "@/types/supabase";

export async function createProject(
  serviceType: string,
  title: string,
  description: string | null,
  metadata: Json,
) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This should ideally be caught client-side, but as a fallback
    redirect("/login"); // Or handle unauthorized access appropriately
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      service_type: serviceType,
      title,
      description,
      metadata,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project.");
  }

  revalidatePath("/dashboard/projects"); // Revalidate the projects page
  return data;
}
