import CategoryPage from "@/pages/CategoryPage";
import { ThemeProvider } from "@/lib/theme-provider";
import { Header } from "../Header";
import { Footer } from "../Footer";

export default function CategoryPageExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Header />
        <CategoryPage />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
