import Banner from "./components/home/Banner";
import Categories from "./components/home/Categories";
import LatestProducts from "./components/home/LatestProducts";
import Testimonials from "./components/home/Testimonials";
import GlobalReach from "./components/home/GlobalReach";
import Pricing from "./components/home/Pricing";
import FAQ from "./components/home/FAQ";
import ContactPage from "./contact/page";
import TradeCardSection from "./components/common/TradeCardSection";

export default function Home() {
  return (
    <div>
      <Banner />
      <TradeCardSection
        kicker="Verified Trader Credential"
        title="Trade beyond borders."
        description="Every verified Elevex enterprise account receives cryptographic settlement credentials—enabling instant port pre-clearance and dispute-free cross-border transfers."
        ctaText="Open an Account"
        ctaHref="/signup"
      />
      <Categories />
      <LatestProducts />
      <GlobalReach />
      <Testimonials />
      <Pricing />
      <ContactPage />
      <FAQ />
    </div>
  );
}
