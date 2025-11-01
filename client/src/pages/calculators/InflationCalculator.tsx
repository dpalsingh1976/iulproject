import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Link } from "wouter";
import { ArrowLeft, Flame, TrendingDown, AlertCircle } from "lucide-react";

export default function InflationCalculator() {
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [yearsInRetirement, setYearsInRetirement] = useState(25);
  const [annualExpenses, setAnnualExpenses] = useState(50000);
  const [inflationRate, setInflationRate] = useState(3);
  const [portfolioReturn, setPortfolioReturn] = useState(6);

  // Calculate purchasing power erosion
  const futureExpenses = annualExpenses * Math.pow(1 + inflationRate / 100, yearsInRetirement);
  const purchasingPowerLoss = ((futureExpenses - annualExpenses) / annualExpenses) * 100;

  // Calculate total needed with inflation
  const calculateTotalNeeded = () => {
    let total = 0;
    for (let year = 1; year <= yearsInRetirement; year++) {
      const yearlyExpense = annualExpenses * Math.pow(1 + inflationRate / 100, year);
      total += yearlyExpense;
    }
    return total;
  };

  const totalNeeded = calculateTotalNeeded();
  const shortfall = Math.max(0, totalNeeded - currentSavings);

  // Calculate real return (return - inflation)
  const realReturn = portfolioReturn - inflationRate;

  // High inflation scenario (5%)
  const highInflationExpenses = annualExpenses * Math.pow(1.05, yearsInRetirement);
  const highInflationTotal = annualExpenses * ((Math.pow(1.05, yearsInRetirement) - 1) / 0.05) * 1.05;

  // Calculate how much more is needed
  const additionalNeeded = highInflationTotal - totalNeeded;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary">Guardian Shield</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/calculators" className="text-sm font-medium text-primary transition-colors">Calculators</Link>
            <Link href="/assessment" className="text-sm font-medium hover:text-primary transition-colors">Risk Assessment</Link>
          </nav>
          <Link href="/assessment"><Button>Start Assessment</Button></Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/calculators">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculators
          </Button>
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-950 mb-4">
            <Flame className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Inflation Stress Test</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Analyze how inflation and market volatility impact your retirement savings over time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Retirement Plan</CardTitle>
                <CardDescription>Current financial situation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="savings">Current Retirement Savings</Label>
                  <Input
                    id="savings"
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="expenses">Annual Expenses (Today's Dollars)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    value={annualExpenses}
                    onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    How much you spend per year
                  </p>
                </div>
                <div>
                  <Label>Years in Retirement: {yearsInRetirement}</Label>
                  <Slider
                    value={[yearsInRetirement]}
                    onValueChange={([value]) => setYearsInRetirement(value)}
                    min={10}
                    max={40}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Economic Assumptions</CardTitle>
                <CardDescription>Inflation and return expectations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Expected Inflation Rate: {inflationRate}%</Label>
                  <Slider
                    value={[inflationRate]}
                    onValueChange={([value]) => setInflationRate(value)}
                    min={1}
                    max={6}
                    step={0.5}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Historical average: 2-3%, Recent: 3-5%
                  </p>
                </div>
                <div>
                  <Label>Portfolio Return: {portfolioReturn}%</Label>
                  <Slider
                    value={[portfolioReturn]}
                    onValueChange={([value]) => setPortfolioReturn(value)}
                    min={3}
                    max={10}
                    step={0.5}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Expected annual return on investments
                  </p>
                </div>
                <div className="p-3 bg-accent rounded-lg">
                  <div className="font-semibold mb-1">Real Return (After Inflation)</div>
                  <div className={`text-2xl font-bold ${realReturn < 3 ? 'text-red-600' : 'text-green-600'}`}>
                    {realReturn.toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {realReturn < 3 ? 'Low real return - high inflation risk' : 'Healthy real return'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inflation Impact Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <div className="font-semibold mb-1">At 3% Inflation</div>
                  <div className="text-muted-foreground">
                    $100 today = $55 purchasing power in 20 years
                  </div>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="font-semibold mb-1">At 5% Inflation</div>
                  <div className="text-muted-foreground">
                    $100 today = $38 purchasing power in 20 years
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-orange-500">
              <CardHeader>
                <CardTitle className="text-2xl">Inflation Stress Test Results</CardTitle>
                <CardDescription>Impact on your retirement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame className="h-5 w-5 text-orange-600" />
                    <div className="font-semibold">Purchasing Power Erosion</div>
                  </div>
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    -{purchasingPowerLoss.toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Your ${annualExpenses.toLocaleString()} today will need ${futureExpenses.toLocaleString(undefined, { maximumFractionDigits: 0 })} in {yearsInRetirement} years
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="font-semibold mb-2">Total Needed (Inflation-Adjusted)</div>
                    <div className="text-3xl font-bold">
                      ${totalNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      To maintain purchasing power for {yearsInRetirement} years
                    </div>
                  </div>

                  <div className="p-4 bg-accent rounded-lg">
                    <div className="font-semibold mb-2">Current Savings</div>
                    <div className="text-3xl font-bold">
                      ${currentSavings.toLocaleString()}
                    </div>
                  </div>

                  {shortfall > 0 ? (
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="h-5 w-5 text-red-600" />
                        <div className="font-semibold text-red-600">Shortfall Detected</div>
                      </div>
                      <div className="text-3xl font-bold text-red-600 mb-1">
                        ${shortfall.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Additional savings needed to meet inflation-adjusted expenses
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                      <div className="font-semibold text-green-600 mb-2">✓ On Track</div>
                      <div className="text-sm">
                        Your savings should cover inflation-adjusted expenses
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <div className="font-semibold">High Inflation Scenario (5%)</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Future annual expenses:</span>
                      <span className="font-bold">${highInflationExpenses.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total needed:</span>
                      <span className="font-bold">${highInflationTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Additional needed vs. {inflationRate}%:</span>
                      <span className="font-bold">${additionalNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="font-semibold">Inflation Protection Strategies</div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <span><strong>TIPS:</strong> Treasury Inflation-Protected Securities</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <span><strong>I-Bonds:</strong> Inflation-indexed savings bonds</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <span><strong>Real Estate:</strong> Rental income adjusts with inflation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <span><strong>IUL:</strong> Indexed growth with downside protection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <span><strong>Annuities with COLA:</strong> Inflation-adjusted income</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href="/assessment" className="flex-1">
                    <Button className="w-full">Get Protection Plan</Button>
                  </Link>
                  <Link href="/iul-banking" className="flex-1">
                    <Button variant="outline" className="w-full">Learn About IUL</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

