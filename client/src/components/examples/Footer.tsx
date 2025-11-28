import { Footer } from "../Footer";
import { ThemeProvider } from "@/lib/theme-provider";

export default function FooterExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <Footer />
    </ThemeProvider>
  );
}
