import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExperience } from "@/lib/experiences";
import { ExperienceDetail } from "@/components/experience-detail";

type ExperiencePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);

  if (!experience) {
    return {
      title: "Experience not found",
    };
  }

  return {
    title: `${experience.title} | Portfolio`,
    description: experience.intro,
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const experience = getExperience(slug);

  if (!experience) {
    notFound();
  }

  return <ExperienceDetail experience={experience} />;
}
