import HomePage from "./pages/HomePage";
import { CartProvider } from "./context/CartProvider";
import { LanguageProvider } from "./context/LanguageProvider";

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <HomePage />
      </CartProvider>
    </LanguageProvider>
  );
}
