import HomePage from "@/pages/HomePage";
import { ThemeProvider } from "@/lib/theme-provider";
import { Header } from "../Header";
import { Footer } from "../Footer";

export default function HomePageExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Header />
        <HomePage />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
