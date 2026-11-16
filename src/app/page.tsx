import PortfolioSite from "@/components/PortfolioSite";
import { getShowcaseData } from "@/lib/portfolio";

export default function HomePage() {
  return <PortfolioSite showcaseData={getShowcaseData()} />;
}
