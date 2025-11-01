import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Calculators from "./pages/Calculators";
import DIMECalculator from "./pages/calculators/DIMECalculator";
import TaxFreeEstimator from "./pages/calculators/TaxFreeEstimator";
import IULComparison from "./pages/calculators/IULComparison";
import AnnuityCalculator from "./pages/calculators/AnnuityCalculator";
import LongevityCalculator from "./pages/calculators/LongevityCalculator";
import InflationCalculator from "./pages/calculators/InflationCalculator";
import RiskAssessment from "./pages/RiskAssessment";
import AssessmentResults from "./pages/AssessmentResults";
import IULBanking from "./pages/IULBanking";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/calculators" component={Calculators} />
      <Route path="/calculators/dime" component={DIMECalculator} />
      <Route path="/calculators/7702" component={TaxFreeEstimator} />
      <Route path="/calculators/iul-comparison" component={IULComparison} />
      <Route path="/calculators/annuity" component={AnnuityCalculator} />
      <Route path="/calculators/longevity" component={LongevityCalculator} />
      <Route path="/calculators/inflation" component={InflationCalculator} />
      <Route path="/assessment" component={RiskAssessment} />
      <Route path="/assessment-results" component={AssessmentResults} />
      <Route path="/iul-banking" component={IULBanking} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
