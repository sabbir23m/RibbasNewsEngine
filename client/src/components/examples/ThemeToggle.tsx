import { ThemeToggle } from "../ThemeToggle";
import { ThemeProvider } from "@/lib/theme-provider";

export default function ThemeToggleExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Toggle theme:</span>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
