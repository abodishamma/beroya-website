import HomePage from "./pages/HomePage";
import { LanguageProvider } from "./context/LanguageProvider";

export default function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}
