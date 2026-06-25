import About from "../sections/About";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import Navbar from "../sections/Navbar";
import Products from "../sections/Products";
import Quality from "../sections/Quality";
import Technology from "../sections/Technology";
import Values from "../sections/Values";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Values />
        <About />
        <Technology />
        <Products />
        <Quality />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
