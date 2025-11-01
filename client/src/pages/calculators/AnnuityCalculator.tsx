import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Link } from "wouter";
import { ArrowLeft, DollarSign, Calendar, TrendingUp } from "lucide-react";

export default function AnnuityCalculator() {
  const [purchaseAmount, setPurchaseAmount] = useState(250000);
  const [age, setAge] = useState(65);
  const [payoutRate, setPayoutRate] = useState(5.5);
  const [inflationAdjustment, setInflationAdjustment] = useState(2);

  // Calculate annuity payments
  const annualIncome = purchaseAmount * (payoutRate / 100);
  const monthlyIncome = annualIncome / 12;
  
  // Life expectancy (simplified)
  const lifeExpectancy = 85;
  const yearsOfPayments = lifeExpectancy - age;
  const totalPayments = annualIncome * yearsOfPayments;
  
  // With inflation adjustment
  const inflationAdjustedIncome = annualIncome * Math.pow(1 + inflationAdjustment / 100, 10);
  
  // Break-even analysis
  const breakEvenYears = purchaseAmount / annualIncome;

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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950 mb-4">
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Annuity Income Calculator</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estimate guaranteed lifetime income from immediate or deferred annuities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Annuity Details</CardTitle>
                <CardDescription>Configure your annuity purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="purchase">Purchase Amount</Label>
                  <Input
                    id="purchase"
                    type="number"
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Lump sum to invest in annuity
                  </p>
                </div>
                <div>
                  <Label>Your Age When Payments Begin: {age}</Label>
                  <Slider
                    value={[age]}
                    onValueChange={([value]) => setAge(value)}
                    min={50}
                    max={80}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Annual Payout Rate: {payoutRate}%</Label>
                  <Slider
                    value={[payoutRate]}
                    onValueChange={([value]) => setPayoutRate(value)}
                    min={3}
                    max={8}
                    step={0.1}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Typical rates: 4-6% depending on age and type
                  </p>
                </div>
                <div>
                  <Label>Inflation Adjustment (COLA): {inflationAdjustment}%</Label>
                  <Slider
                    value={[inflationAdjustment]}
                    onValueChange={([value]) => setInflationAdjustment(value)}
                    min={0}
                    max={3}
                    step={0.5}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Cost-of-living adjustment (reduces initial payout)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Annuity Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="font-semibold mb-1">Immediate Annuity</div>
                  <div className="text-muted-foreground">Payments start within 1 year of purchase</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="font-semibold mb-1">Deferred Annuity</div>
                  <div className="text-muted-foreground">Payments start at a future date (tax-deferred growth)</div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="font-semibold mb-1">Fixed Indexed Annuity</div>
                  <div className="text-muted-foreground">Growth linked to market index with downside protection</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-2xl">Your Guaranteed Income</CardTitle>
                <CardDescription>Lifetime payment projections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Annual Income</div>
                  <div className="text-5xl font-bold text-primary mb-2">
                    ${annualIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    ${monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}/month
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div className="text-sm font-semibold">Break-Even</div>
                    </div>
                    <div className="text-2xl font-bold">
                      {breakEvenYears.toFixed(1)} years
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      At age {Math.ceil(age + breakEvenYears)}
                    </div>
                  </div>
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <div className="text-sm font-semibold">Total Payments</div>
                    </div>
                    <div className="text-2xl font-bold">
                      ${(totalPayments / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      To age {lifeExpectancy}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="font-semibold mb-2">With {inflationAdjustment}% Annual Increase</div>
                  <div className="text-sm text-muted-foreground mb-2">Income in 10 years:</div>
                  <div className="text-3xl font-bold text-green-600">
                    ${inflationAdjustedIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Protects purchasing power against inflation
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="font-semibold">Key Benefits</div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                    <span>Guaranteed income for life, no matter how long you live</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                    <span>Protection against outliving your savings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                    <span>Predictable income for budgeting</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                    <span>Tax-deferred growth (deferred annuities)</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href="/assessment" className="flex-1">
                    <Button className="w-full">Get Personalized Quote</Button>
                  </Link>
                  <Link href="/calculators" className="flex-1">
                    <Button variant="outline" className="w-full">Compare Options</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Annuity rates vary by insurance company, age, health, and market conditions. This calculator provides estimates only. Actual rates may differ. Consult with a licensed insurance professional for accurate quotes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

