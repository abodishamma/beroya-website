import About from "../sections/About";
import Contact from "../sections/Contact";
import Difference from "../sections/Difference";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import Manufacturing from "../sections/Manufacturing";
import Navbar from "../sections/Navbar";
import Shop from "../sections/Shop";
import Quality from "../sections/Quality";
import Technology from "../sections/Technology";
import Values from "../sections/Values";
import { useLanguage } from "../hooks/useLanguage";
import { useSmoothAnchors } from "../hooks/useSmoothAnchors";

export default function HomePage() {
  const { content } = useLanguage();
  useSmoothAnchors();

  return (
    <>
      <a className="skip-link" href="#main-content">
        {content.skip}
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Values />
        <About />
        <Difference />
        <Technology />
        <Manufacturing />
        <Shop />
        <Quality />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
