import Banner from "./components/home/Banner";
import Testimonials from "./components/home/Testimonials";
import GlobalReach from "./components/home/GlobalReach";
import ContactPage from "./contact/page";

export default function Home() {
  return (
    <div>
      <Banner />
      <Testimonials />
      <GlobalReach />
      <ContactPage />
    </div>
  );
}
