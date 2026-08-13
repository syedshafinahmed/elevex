import Banner from "./components/home/Banner";
import Testimonials from "./components/home/Testimonials";
import GlobalReach from "./components/home/GlobalReach";
import Pricing from "./components/home/Pricing";
import FAQ from "./components/home/FAQ";
import ContactPage from "./contact/page";

export default function Home() {
  return (
    <div>
      <Banner />
      <GlobalReach />
      <Testimonials />
      <Pricing />
      <ContactPage />
      <FAQ />
    </div>
  );
}
