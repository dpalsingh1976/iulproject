import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Link } from "wouter";
import { ArrowLeft, PieChart, TrendingUp } from "lucide-react";

export default function TaxFreeEstimator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [taxBracket, setTaxBracket] = useState(24);
  const [expectedReturn, setExpectedReturn] = useState(7);

  const yearsToRetirement = retirementAge - currentAge;
  const annualContribution = monthlyContribution * 12;

  // Calculate future values for each account type
  const calculateFutureValue = (rate: number) => {
    const monthlyRate = rate / 100 / 12;
    const months = yearsToRetirement * 12;
    return monthlyContribution * (((1 + monthlyRate) ** months - 1) / monthlyRate);
  };

  const taxFreeValue = calculateFutureValue(expectedReturn);
  const taxDeferredValue = calculateFutureValue(expectedReturn);
  const taxableValue = calculateFutureValue(expectedReturn * (1 - taxBracket / 100));

  // Calculate retirement income (4% withdrawal rate)
  const withdrawalRate = 0.04;
  const taxFreeIncome = taxFreeValue * withdrawalRate;
  const taxDeferredIncome = taxDeferredValue * withdrawalRate * (1 - taxBracket / 100);
  const taxableIncome = taxableValue * withdrawalRate * (1 - taxBracket / 100 * 0.5); // 50% capital gains

  const taxSavings = (taxFreeIncome - taxDeferredIncome) * 30; // Over 30 years of retirement

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
            <PieChart className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">7702 Tax-Free Estimator</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare tax-free (IUL/Roth), tax-deferred (401k/IRA), and taxable retirement strategies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Tell us about your retirement timeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Age: {currentAge}</Label>
                  <Slider
                    value={[currentAge]}
                    onValueChange={([value]) => setCurrentAge(value)}
                    min={18}
                    max={70}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Retirement Age: {retirementAge}</Label>
                  <Slider
                    value={[retirementAge]}
                    onValueChange={([value]) => setRetirementAge(value)}
                    min={currentAge + 5}
                    max={80}
                    step={1}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {yearsToRetirement} years until retirement
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contribution & Returns</CardTitle>
                <CardDescription>How much will you save?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="monthly">Monthly Contribution</Label>
                  <Input
                    id="monthly"
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    ${annualContribution.toLocaleString()}/year
                  </p>
                </div>
                <div>
                  <Label>Expected Annual Return: {expectedReturn}%</Label>
                  <Slider
                    value={[expectedReturn]}
                    onValueChange={([value]) => setExpectedReturn(value)}
                    min={3}
                    max={12}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Tax Bracket in Retirement: {taxBracket}%</Label>
                  <Slider
                    value={[taxBracket]}
                    onValueChange={([value]) => setTaxBracket(value)}
                    min={10}
                    max={37}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-2xl">Retirement Comparison</CardTitle>
                <CardDescription>At age {retirementAge}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-500">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold text-green-700 dark:text-green-400">Tax-Free (IUL/Roth)</div>
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      ${taxFreeValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Annual Income: ${taxFreeIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-green-600 font-semibold mt-2">
                      ✓ 100% tax-free withdrawals
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">Tax-Deferred (401k/IRA)</div>
                    </div>
                    <div className="text-3xl font-bold mb-1">
                      ${taxDeferredValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Annual Income: ${taxDeferredIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-orange-600 font-semibold mt-2">
                      ⚠ Taxed at {taxBracket}% on withdrawal
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-950/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">Taxable (Brokerage)</div>
                    </div>
                    <div className="text-3xl font-bold mb-1">
                      ${taxableValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Annual Income: ${taxableIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-orange-600 font-semibold mt-2">
                      ⚠ Taxed annually + capital gains
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="font-semibold mb-2">Tax-Free Advantage</div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    ${taxSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Additional retirement income over 30 years vs. tax-deferred
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                    <span>Tax-free growth and withdrawals with IUL</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                    <span>No Required Minimum Distributions (RMDs)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                    <span>Downside protection with floor guarantees</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href="/iul-banking" className="flex-1">
                    <Button className="w-full">Learn About IUL</Button>
                  </Link>
                  <Link href="/assessment" className="flex-1">
                    <Button variant="outline" className="w-full">Get Quote</Button>
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

