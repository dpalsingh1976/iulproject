import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Link } from "wouter";
import { ArrowLeft, Clock, AlertTriangle, TrendingDown } from "lucide-react";

export default function LongevityCalculator() {
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [currentAge, setCurrentAge] = useState(65);
  const [annualWithdrawal, setAnnualWithdrawal] = useState(40000);
  const [expectedReturn, setExpectedReturn] = useState(5);
  const [inflationRate, setInflationRate] = useState(3);

  // Calculate how long money will last
  const calculateYearsRemaining = () => {
    let balance = currentSavings;
    let years = 0;
    let withdrawal = annualWithdrawal;
    
    while (balance > 0 && years < 50) {
      balance = balance * (1 + expectedReturn / 100) - withdrawal;
      withdrawal = withdrawal * (1 + inflationRate / 100); // Adjust for inflation
      years++;
    }
    
    return years;
  };

  const yearsRemaining = calculateYearsRemaining();
  const ageWhenDepleted = currentAge + yearsRemaining;
  const withdrawalRate = (annualWithdrawal / currentSavings) * 100;
  
  // Safe withdrawal rate is typically 4%
  const safeWithdrawalRate = 4;
  const safeAnnualWithdrawal = currentSavings * (safeWithdrawalRate / 100);
  const shortfall = annualWithdrawal - safeAnnualWithdrawal;

  // Life expectancy
  const lifeExpectancy = 85;
  const yearsNeeded = lifeExpectancy - currentAge;
  const isAtRisk = yearsRemaining < yearsNeeded;

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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-950 mb-4">
            <Clock className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Longevity Risk Calculator</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate how long your retirement savings will last and avoid outliving your money
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Retirement Savings</CardTitle>
                <CardDescription>Current financial situation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="savings">Total Retirement Savings</Label>
                  <Input
                    id="savings"
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    All retirement accounts combined
                  </p>
                </div>
                <div>
                  <Label>Current Age: {currentAge}</Label>
                  <Slider
                    value={[currentAge]}
                    onValueChange={([value]) => setCurrentAge(value)}
                    min={50}
                    max={80}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="withdrawal">Annual Withdrawal Amount</Label>
                  <Input
                    id="withdrawal"
                    type="number"
                    value={annualWithdrawal}
                    onChange={(e) => setAnnualWithdrawal(Number(e.target.value))}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Current withdrawal rate: {withdrawalRate.toFixed(1)}%
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assumptions</CardTitle>
                <CardDescription>Growth and inflation expectations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Expected Annual Return: {expectedReturn}%</Label>
                  <Slider
                    value={[expectedReturn]}
                    onValueChange={([value]) => setExpectedReturn(value)}
                    min={2}
                    max={10}
                    step={0.5}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Conservative: 4-5%, Moderate: 6-7%, Aggressive: 8-10%
                  </p>
                </div>
                <div>
                  <Label>Inflation Rate: {inflationRate}%</Label>
                  <Slider
                    value={[inflationRate]}
                    onValueChange={([value]) => setInflationRate(value)}
                    min={1}
                    max={5}
                    step={0.5}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Historical average: 2-3%
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>The 4% Rule</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>
                  Financial planners traditionally recommend withdrawing no more than <strong>4% per year</strong> to ensure your money lasts 30+ years.
                </p>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg mt-3">
                  <div className="font-semibold mb-1">Your Safe Withdrawal Amount</div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${safeAnnualWithdrawal.toLocaleString(undefined, { maximumFractionDigits: 0 })}/year
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Based on 4% rule
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className={`border-2 ${isAtRisk ? 'border-red-500' : 'border-green-500'}`}>
              <CardHeader>
                <CardTitle className="text-2xl">Longevity Analysis</CardTitle>
                <CardDescription>How long will your money last?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className={`text-center p-6 rounded-lg ${isAtRisk ? 'bg-red-50 dark:bg-red-950/20' : 'bg-green-50 dark:bg-green-950/20'}`}>
                  <div className="text-sm text-muted-foreground mb-2">Your Money Will Last</div>
                  <div className={`text-5xl font-bold mb-2 ${isAtRisk ? 'text-red-600' : 'text-green-600'}`}>
                    {yearsRemaining} Years
                  </div>
                  <div className="text-lg text-muted-foreground">
                    Until age {ageWhenDepleted}
                  </div>
                </div>

                {isAtRisk && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div className="font-semibold text-red-600">Longevity Risk Detected</div>
                    </div>
                    <p className="text-sm mb-3">
                      Your savings may run out before age {lifeExpectancy}. You could outlive your money by <strong>{yearsNeeded - yearsRemaining} years</strong>.
                    </p>
                    <div className="text-sm">
                      <div className="font-semibold mb-2">Recommended Actions:</div>
                      <ul className="space-y-1 ml-4">
                        <li>• Reduce annual withdrawal to ${safeAnnualWithdrawal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</li>
                        <li>• Consider part-time work to supplement income</li>
                        <li>• Explore guaranteed income products (annuities)</li>
                        <li>• Delay Social Security for higher benefits</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Current Withdrawal Rate</span>
                      <span className={`text-xl font-bold ${withdrawalRate > safeWithdrawalRate ? 'text-red-600' : 'text-green-600'}`}>
                        {withdrawalRate.toFixed(1)}%
                      </span>
                    </div>
                    {withdrawalRate > safeWithdrawalRate && (
                      <div className="text-sm text-red-600 flex items-center gap-2">
                        <TrendingDown className="h-4 w-4" />
                        <span>{(withdrawalRate - safeWithdrawalRate).toFixed(1)}% above safe rate</span>
                      </div>
                    )}
                  </div>

                  {shortfall > 0 && (
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <div className="font-semibold mb-2">Annual Shortfall</div>
                      <div className="text-2xl font-bold text-orange-600">
                        ${shortfall.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Amount above safe withdrawal rate
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="font-semibold">Solutions to Consider</div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <span><strong>Immediate Annuity:</strong> Guaranteed lifetime income</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <span><strong>IUL Policy:</strong> Tax-free income with growth potential</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <span><strong>Bucket Strategy:</strong> Segment assets by time horizon</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <span><strong>Reverse Mortgage:</strong> Tap home equity</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href="/assessment" className="flex-1">
                    <Button className="w-full">Get Personalized Plan</Button>
                  </Link>
                  <Link href="/calculators/annuity" className="flex-1">
                    <Button variant="outline" className="w-full">Annuity Calculator</Button>
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

