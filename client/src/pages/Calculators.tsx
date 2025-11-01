import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, PieChart, TrendingUp, DollarSign, Clock, Flame } from "lucide-react";
import { Link } from "wouter";

const calculators = [
  {
    id: "dime",
    title: "DIME Life Insurance Calculator",
    description: "Calculate your exact life insurance needs using the DIME method",
    icon: Target,
    color: "blue",
    path: "/calculators/dime"
  },
  {
    id: "7702",
    title: "7702 Tax-Free Estimator",
    description: "Compare tax-free, tax-deferred, and taxable retirement strategies",
    icon: PieChart,
    color: "green",
    path: "/calculators/7702"
  },
  {
    id: "iul-comparison",
    title: "IUL vs 401k/IRA Comparison",
    description: "Stress test IUL against traditional retirement accounts",
    icon: TrendingUp,
    color: "orange",
    path: "/calculators/iul-comparison"
  },
  {
    id: "annuity",
    title: "Annuity Income Calculator",
    description: "Estimate guaranteed lifetime income from annuities",
    icon: DollarSign,
    color: "blue",
    path: "/calculators/annuity"
  },
  {
    id: "longevity",
    title: "Longevity Risk Calculator",
    description: "Calculate how long your retirement savings will last",
    icon: Clock,
    color: "green",
    path: "/calculators/longevity"
  },
  {
    id: "inflation",
    title: "Inflation Stress Test",
    description: "Analyze market volatility and inflation impact on savings",
    icon: Flame,
    color: "orange",
    path: "/calculators/inflation"
  }
];

export default function Calculators() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary">Guardian Shield</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/calculators" className="text-sm font-medium text-primary">Calculators</Link>
            <Link href="/assessment" className="text-sm font-medium hover:text-primary transition-colors">Risk Assessment</Link>
          </nav>
          <Link href="/assessment"><Button>Start Assessment</Button></Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Financial Calculators</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional-grade tools to help you make informed decisions about life insurance, retirement planning, and wealth building strategies.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <Card key={calc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg bg-${calc.color}-100 dark:bg-${calc.color}-950 flex items-center justify-center mb-4`}>
                    <Icon className={`h-8 w-8 text-${calc.color}-600`} />
                  </div>
                  <CardTitle className="text-xl">{calc.title}</CardTitle>
                  <CardDescription className="text-base">
                    {calc.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={calc.path}><Button className="w-full" size="lg">
                    Calculate Now
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button></Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-8 bg-primary/10 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Need Personalized Guidance?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            These calculators provide estimates based on standard assumptions. For a comprehensive analysis tailored to your unique situation, complete our risk assessment.
          </p>
          <Link href="/assessment"><Button size="lg">Start Full Risk Assessment</Button></Link>
        </div>
      </div>
    </div>
  );
}

