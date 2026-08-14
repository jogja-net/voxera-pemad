
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Dictionary } from "@/lib/i18n";
import { Database } from "@/types/supabase";

export default async function ProjectsPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  if (!hasLocale(lang)) notFound();
  const dict: Dictionary = getDictionary(lang);

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to login or show a message
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">{dict.nav.project}</h1>
        <p>{dict.auth.loginIntro}</p>
      </div>
    );
  }

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, service_type, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">{dict.nav.project}</h1>
        <p>Error loading projects.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{dict.nav.project}</h1>
      {projects && projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((project: Pick<Database["public"]["Tables"]["projects"]["Row"], "id" | "title" | "service_type" | "created_at">) => (
            <li key={project.id} className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-600">Service Type: {project.service_type}</p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(project.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}
