import HomePage from "./pages/HomePage";
import CartToast from "./components/shop/CartToast";
import { CartProvider } from "./context/CartProvider";
import { LanguageProvider } from "./context/LanguageProvider";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Manufacturing from "./sections/Manufacturing";
import Navbar from "./sections/Navbar";
import Quality from "./sections/Quality";
import Shop from "./sections/Shop";
import Technology from "./sections/Technology";
import { useLanguage } from "./hooks/useLanguage";
import { useRoute } from "./hooks/useRoute";

function RoutedSite() {
  const route = useRoute();
  const { content } = useLanguage();

  const pages = {
    home: <HomePage />,
    shop: <Shop mode="catalog" />,
    product: <Shop mode="detail" productId={route.productId} />,
    cart: <Shop mode="cart" />,
    checkout: <Shop mode="checkout" />,
    about: <About />,
    technology: <Technology />,
    manufacturing: <Manufacturing />,
    quality: <Quality />,
    contact: <Contact />,
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        {content.skip}
      </a>
      <Navbar currentPage={route.page} />
      <main id="main-content" key={route.key}>
        {pages[route.page] ?? pages.home}
      </main>
      <CartToast />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <RoutedSite />
      </CartProvider>
    </LanguageProvider>
  );
}
