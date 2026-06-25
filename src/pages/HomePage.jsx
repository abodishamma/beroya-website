import About from "../sections/About";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import GlobalPresence from "../sections/GlobalPresence";
import Hero from "../sections/Hero";
import Navbar from "../sections/Navbar";
import Products from "../sections/Products";
import Quality from "../sections/Quality";
import Technology from "../sections/Technology";
import WhyBeroya from "../sections/WhyBeroya";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Technology />
        <Products />
        <Quality />
        <GlobalPresence />
        <WhyBeroya />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
