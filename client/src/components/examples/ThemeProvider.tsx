import { ThemeProvider, useTheme } from '../ThemeProvider';
import { Button } from "@/components/ui/button";

function ThemeToggleExample() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="p-8 space-y-4">
      <p>Current theme: <strong>{theme}</strong></p>
      <Button onClick={toggleTheme}>
        Toggle Theme
      </Button>
    </div>
  );
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <ThemeToggleExample />
    </ThemeProvider>
  );
}
