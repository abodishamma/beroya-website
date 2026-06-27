import About from "../sections/About";
import Contact from "../sections/Contact";
import Difference from "../sections/Difference";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import Manufacturing from "../sections/Manufacturing";
import Navbar from "../sections/Navbar";
import Products from "../sections/Products";
import Quality from "../sections/Quality";
import Technology from "../sections/Technology";
import Values from "../sections/Values";
import { useLanguage } from "../hooks/useLanguage";

export default function HomePage() {
  const { content } = useLanguage();

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
        <Products />
        <Quality />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
