import { experiences } from "@/lib/data";
import ExperienceDetailPage from "./ExperienceDetail";

export function generateStaticParams() {
  return experiences.map((e) => ({ id: e.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ExperienceDetailPage id={id} />;
}
