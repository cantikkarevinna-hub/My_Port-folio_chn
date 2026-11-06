import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { portfolioItems } from "@/data/content";

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ id: item.id }));
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = portfolioItems.find((project) => project.id === id);

  if (!item) notFound();

  return (
    <main className="relative z-10 min-h-screen bg-[#0d0d0d] text-white">
      <div className="page-grid" aria-hidden="true" />
      <ProjectDetail item={item} />
    </main>
  );
}
